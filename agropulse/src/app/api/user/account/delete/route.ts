import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete user and all associated data
    await db.user.delete({
      where: { email: session.user.email },
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Failed to delete account:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
