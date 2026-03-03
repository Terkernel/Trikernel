import { auth } from '~/server/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = {
      profileVisibility: 'public',
      showLocation: true,
      showRatings: true,
      showListings: true,
      allowMessages: true,
      blockUnverified: false,
      dataSharing: false,
      searchIndexing: true,
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to get privacy settings:', error);
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await req.json();

    // Save settings
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to save privacy settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
