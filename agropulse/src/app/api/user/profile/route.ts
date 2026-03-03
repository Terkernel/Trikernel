import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: {
        name: data.name || undefined,
        phone: data.phone || undefined,
        address: data.address || undefined,
        city: data.city || undefined,
        state: data.state || undefined,
        pincode: data.pincode || undefined,
        image: data.image || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
