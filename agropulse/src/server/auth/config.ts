import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";

import { db } from "~/server/db";
import { type UserRole } from "../../../generated/prisma";

// Rate limiting for authentication attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      phone?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    phone?: string | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // Log failed attempt
          await logAuthAttempt(null, "INVALID_CREDENTIALS", "Missing email or password");
          throw new Error("Please provide email and password");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          // Log failed attempt
          await logAuthAttempt(null, "USER_NOT_FOUND", credentials.email as string);
          throw new Error("Invalid credentials");
        }

        if (!user.password) {
          await logAuthAttempt(user.id, "NO_PASSWORD", credentials.email as string);
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          // Log failed attempt
          await logAuthAttempt(user.id, "INVALID_PASSWORD", credentials.email as string);
          throw new Error("Invalid credentials");
        }

        // Log successful login
        await logAuthAttempt(user.id, "SUCCESS", credentials.email as string);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          phone: user.phone,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log successful sign in
      if (user?.id) {
        await db.auditLog.create({
          data: {
            userId: user.id,
            action: "SIGN_IN",
            details: {
              provider: account?.provider || "credentials",
              isNewUser,
            },
          },
        });
      }
    },
    async signOut(data) {
      // Log sign out - simplified to avoid type issues
      try {
        const userId = 'token' in data ? data.token?.id : null;
        if (userId) {
          await db.auditLog.create({
            data: {
              userId: userId as string,
              action: "SIGN_OUT",
              details: {},
            },
          });
        }
      } catch (error) {
        // Ignore audit log errors
      }
    }
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        role: token.role as UserRole,
        phone: token.phone as string | null | undefined,
      },
    }),
    async signIn({ user, account, profile }) {
      // Additional security checks
      if (account?.provider === "credentials" && user?.id) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { isActive: true, lockedUntil: true, failedLoginAttempts: true },
        });

        if (!dbUser?.isActive) {
          throw new Error("Account is deactivated");
        }

        if (dbUser.lockedUntil && dbUser.lockedUntil > new Date()) {
          throw new Error("Account is temporarily locked due to too many failed attempts");
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

// Helper function to log authentication attempts
async function logAuthAttempt(
  userId: string | null,
  type: string,
  identifier: string
) {
  try {
    await db.auditLog.create({
      data: {
        userId,
        action: "AUTH_ATTEMPT",
        details: {
          type,
          identifier,
          ipAddress: "unknown", // Would need to get from request headers
          userAgent: "unknown", // Would need to get from request headers
        },
      },
    });
  } catch (error) {
    // Don't throw error for logging failures
    console.error("Failed to log auth attempt:", error);
  }
}
