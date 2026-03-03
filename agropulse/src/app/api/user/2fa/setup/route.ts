import { auth } from '~/server/auth';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { totp } from 'otplib';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate new secret
    const secret = randomBytes(32).toString('hex').slice(0, 32);

    // For demo, return the secret (in production, would generate QR code)
    return NextResponse.json({
      secret,
      qrCode: `otpauth://totp/AgroPulse:${session.user.email}?secret=${secret}&issuer=AgroPulse`,
    });
  } catch (error) {
    console.error('Failed to setup 2FA:', error);
    return NextResponse.json({ error: 'Failed to setup 2FA' }, { status: 500 });
  }
}
