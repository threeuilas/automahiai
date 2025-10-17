import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { crop } from '@/lib/db/schema/crop';
import { CreateCropRequest } from '@/lib/schema/crops';

export async function createCrop(data: CreateCropRequest) {
  const [newCrop] = await db
    .insert(crop)
    .values({
      name: data.name,
      attributes: data.attributes,
    })
    .returning({ id: crop.id });

  return { id: newCrop.id };
}

export async function getCrop(id: number) {
  const [result] = await db.select().from(crop).where(eq(crop.id, id)).limit(1);

  return result;
}

export async function getAllCrops() {
  return await db.select().from(crop);
}
