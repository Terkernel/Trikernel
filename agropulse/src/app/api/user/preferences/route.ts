import { auth } from '~/server/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const preferences = {
      priceUnits: 'INR',
      distanceUnits: 'km',
      preferredLanguage: 'en',
      dateFormat: 'DD/MM/YYYY',
      enableAutoSync: true,
      enableOfflineMode: true,
      cacheData: true,
      cacheDuration: '60',
      showPriceHistory: true,
      showSimilarListings: true,
      recommendedListings: true,
    };

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Failed to get preferences:', error);
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

    // Save preferences
    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 });
  }
}
