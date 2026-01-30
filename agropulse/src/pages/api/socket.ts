import { Server as NetServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const io = new ServerIO(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    // Store io instance on server
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      // Join user-specific room
      socket.on("join-user", (userId: string) => {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined room`);
      });

      // Join listing-specific room for real-time bidding
      socket.on("join-listing", (listingId: string) => {
        socket.join(`listing_${listingId}`);
        console.log(`Client joined listing ${listingId}`);
      });

      // Handle real-time bidding
      socket.on("place-bid", (data: { listingId: string; bidAmount: number; userId: string }) => {
        // Broadcast to all clients in the listing room
        io.to(`listing_${data.listingId}`).emit("new-bid", {
          listingId: data.listingId,
          bidAmount: data.bidAmount,
          bidderId: data.userId,
          timestamp: new Date(),
        });
      });

      // Handle notifications
      socket.on("send-notification", (data: { userId: string; notification: any }) => {
        io.to(`user_${data.userId}`).emit("notification", data.notification);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  res.end();
};

export default ioHandler;