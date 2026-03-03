import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Disable 2FA
    await db.user.update({
      where: { email: session.user.email },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    });

    return NextResponse.json({ message: '2FA disabled' });
  } catch (error) {
    console.error('Failed to disable 2FA:', error);
    return NextResponse.json({ error: 'Failed to disable 2FA' }, { status: 500 });
  }
}
