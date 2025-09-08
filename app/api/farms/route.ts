import { NextResponse } from 'next/server';
import z from 'zod';

import {
  CreateFarmResponse,
  createFarmRequestSchema,
  DeleteFarmResponse,
  deleteFarmRequestSchema,
  updateFarmRequestSchema,
  UpdateFarmResponse,
} from '@/lib/api/farms';
import { auth } from '@/lib/auth/server';
import {
  createFarm,
  deleteFarm,
  getFarm,
  updateFarm,
} from '@/lib/db/data/farms';
import { getFarmUserRole } from '@/lib/db/data/farmUser';

export async function POST(
  request: Request,
): Promise<NextResponse<CreateFarmResponse>> {
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
    const result = createFarmRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json<CreateFarmResponse>(
        { success: false, error: z.prettifyError(result.error) },
        { status: 400 },
      );
    }

    // Create the farm
    const farm = await createFarm(session.user.id, result.data);

    return NextResponse.json({ ...farm, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating farm:', error);
    return NextResponse.json<CreateFarmResponse>(
      { success: false, error: 'Failed to create farm' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
): Promise<NextResponse<UpdateFarmResponse>> {
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
    const result = updateFarmRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json<CreateFarmResponse>(
        { success: false, error: z.prettifyError(result.error) },
        { status: 400 },
      );
    }
    const farmId = result.data.id;

    // Check if the user is authorized to update the farm
    const farmUserRole = session
      ? await getFarmUserRole(session.user.id, farmId)
      : undefined;

    if (farmUserRole !== 'farmer') {
      return NextResponse.json<UpdateFarmResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 403 },
      );
    }

    // Update the farm
    const updatedFarm = await updateFarm(farmId, result.data.updates);
    if (!updatedFarm) {
      return NextResponse.json<UpdateFarmResponse>(
        { success: false, error: 'Farm not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { ...updatedFarm, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating farm:', error);
    return NextResponse.json<UpdateFarmResponse>(
      { success: false, error: 'Failed to update farm' },
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
    const result = deleteFarmRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json<DeleteFarmResponse>(
        { success: false, error: z.prettifyError(result.error) },
        { status: 400 },
      );
    }
    const farmId = result.data.id;

    // Check if the farm exists
    const farm = await getFarm(farmId);
    if (!farm) {
      return NextResponse.json<DeleteFarmResponse>(
        { success: false, error: 'Farm not found' },
        { status: 404 },
      );
    }

    // Check if the user is authorized to delete the farm
    const farmUserRole = session
      ? await getFarmUserRole(session.user.id, farmId)
      : undefined;

    if (farmUserRole !== 'farmer') {
      return NextResponse.json<DeleteFarmResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 403 },
      );
    }

    // Delete the farm
    await deleteFarm(farmId);

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
