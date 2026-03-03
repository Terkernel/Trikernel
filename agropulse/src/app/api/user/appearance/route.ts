import { auth } from '~/server/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appearance = {
      theme: 'system',
    };

    return NextResponse.json(appearance);
  } catch (error) {
    console.error('Failed to get appearance settings:', error);
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { theme } = await req.json();

    // Save theme preference
    return NextResponse.json({ theme });
  } catch (error) {
    console.error('Failed to save appearance settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
