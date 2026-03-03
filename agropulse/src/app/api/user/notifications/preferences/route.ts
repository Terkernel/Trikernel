import { auth } from '~/server/auth';
import { NextRequest, NextResponse } from 'next/server';

// Notification preferences endpoint
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return default preferences
    const preferences = {
      emailNotifications: true,
      pushNotifications: true,
      bidNotifications: true,
      messageNotifications: true,
      priceAlerts: true,
      newListingsInCategory: true,
      weeklyDigest: false,
      marketingEmails: false,
    };

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Failed to get notification preferences:', error);
    return NextResponse.json({ error: 'Failed to load preferences' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const preferences = await req.json();

    // Save to database or cache
    // For now, returning success
    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Failed to save notification preferences:', error);
    return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 });
  }
}
