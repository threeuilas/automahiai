import { auth } from '@/lib/auth-server';
import { createFarm } from '@/lib/db/data/farms';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name } = body;

    // Validate the input
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Farm name is required' },
        { status: 400 },
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Farm name must be less than 100 characters' },
        { status: 400 },
      );
    }

    // Create the farm
    const farm = await createFarm(name.trim(), session.user.id);

    return NextResponse.json(farm, { status: 201 });
  } catch (error) {
    console.error('Error creating farm:', error);
    return NextResponse.json(
      { error: 'Failed to create farm' },
      { status: 500 },
    );
  }
}
