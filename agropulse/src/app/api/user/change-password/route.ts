import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    // Get user
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, password: true },
    });

    if (!user?.password) {
      return NextResponse.json({ error: 'Password not set' }, { status: 400 });
    }

    // Verify current password
    const bcrypt = await import('bcryptjs');
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10);

    // Update password
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Failed to change password:', error);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
