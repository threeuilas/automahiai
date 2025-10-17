import { NextResponse } from 'next/server';
import z from 'zod';

import {
  CreateCropResponse,
  createCropRequestSchema,
} from '@/lib/schema/crops';
import { auth } from '@/lib/auth/server';
import { createCrop } from '@/lib/db/data/crops';

export async function POST(
  request: Request,
): Promise<NextResponse<CreateCropResponse>> {
  try {
    // Get the session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json<CreateCropResponse>(
        { success: false, error: 'Authentication required' },
        { status: 401 },
      );
    }

    // Parse the request body
    const body = await request.json();
    const result = createCropRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json<CreateCropResponse>(
        { success: false, error: z.prettifyError(result.error) },
        { status: 400 },
      );
    }

    // Create the crop
    const crop = await createCrop(result.data);

    return NextResponse.json({ ...crop, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating crop:', error);
    return NextResponse.json<CreateCropResponse>(
      { success: false, error: 'Failed to create crop' },
      { status: 500 },
    );
  }
}
