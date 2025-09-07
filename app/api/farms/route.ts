import {
  CreateFarmResponse,
  createFarmSchema,
  DeleteFarmResponse,
  deleteFarmSchema,
} from '@/lib/api/farms/schema';
import { auth } from '@/lib/auth/server';
import { createFarm, deleteFarm } from '@/lib/db/data/farms';
import { NextResponse } from 'next/server';
import z from 'zod';

export async function POST(request: Request) {
  try {
    // Get the session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json<CreateFarmResponse>(
        { success: false, error: 'Authentication required' },
        { status: 401 },
      );
    }

    // Parse the request body
    const body = await request.json();
    const result = createFarmSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json<CreateFarmResponse>(
        { success: false, error: z.prettifyError(result.error) },
        { status: 400 },
      );
    }

    // Create the farm
    const farm = await createFarm(session.user.id, result.data);

    return NextResponse.json(farm, { status: 201 });
  } catch (error) {
    console.error('Error creating farm:', error);
    return NextResponse.json<CreateFarmResponse>(
      { success: false, error: 'Failed to create farm' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Get the session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json<DeleteFarmResponse>(
        { success: false, error: 'Authentication required' },
        { status: 401 },
      );
    }

    // Parse the request body
    const body = await request.json();
    const result = deleteFarmSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json<DeleteFarmResponse>(
        { success: false, error: z.prettifyError(result.error) },
        { status: 400 },
      );
    }
    const { id } = result.data;

    // Delete the farm
    await deleteFarm(id);

    return NextResponse.json<DeleteFarmResponse>(
      { success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting farm:', error);
    return NextResponse.json<DeleteFarmResponse>(
      { success: false, error: 'Failed to delete farm' },
      { status: 500 },
    );
  }
}
