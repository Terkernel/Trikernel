import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        cropListings: true,
        bids: true,
        sentMessages: true,
        ratingsGiven: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create JSON response
    const dataJson = JSON.stringify(user, null, 2);

    return new NextResponse(dataJson, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="agropulse-data.json"',
      },
    });
  } catch (error) {
    console.error('Failed to export user data:', error);
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
  }
}
