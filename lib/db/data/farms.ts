import 'server-only';
import { eq, sql } from 'drizzle-orm';

import { db } from '@/lib/db';
import { farmUser, farm } from '@/lib/db/schema';
import { Farm, InsertFarm } from '@/lib/schema/farms';

export const listUserFarms = async (userId: string): Promise<Farm[]> => {
  const res = await db.query.farm.findMany({
    with: {
      farmUser: {
        where: eq(farmUser.userId, userId),
      },
    },
  });

  return res.map((farm) => ({
    id: farm.id,
    name: farm.name,
    description: farm.description,
  }));
};

export const createFarm = async (
  userId: string,
  insertFarm: InsertFarm,
): Promise<Farm> => {
  return await db.transaction(async (tx) => {
    // Create the farm
    const [newFarm] = await tx.insert(farm).values(insertFarm).returning();

    // Add the user as a farmer to the farm
    await tx.insert(farmUser).values({
      userId,
      farmId: newFarm.id,
      role: 'farmer',
    });

    return {
      id: newFarm.id,
      name: newFarm.name,
      description: newFarm.description,
    };
  });
};

export const updateFarm = async (
  farmId: number,
  updateData: Partial<InsertFarm>,
): Promise<Farm | undefined> => {
  const [updatedFarm] = await db
    .update(farm)
    .set({ ...updateData, updatedAt: sql`NOW()` })
    .where(eq(farm.id, farmId))
    .returning();

  return {
    id: updatedFarm.id,
    name: updatedFarm.name,
    description: updatedFarm.description,
  };
};

export const deleteFarm = async (farmId: number): Promise<void> => {
  try {
    await db.transaction(async (tx) => {
      // First delete all farm-user relationships
      await tx.delete(farmUser).where(eq(farmUser.farmId, farmId));
      // Then delete the farm
      await tx.delete(farm).where(eq(farm.id, farmId));
    });
  } catch (error) {
    console.error(`Failed to delete farm ${farmId}:`, error);
    throw new Error(
      `Failed to delete farm: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export const getFarm = async (farmId: number): Promise<Farm | undefined> => {
  const res = await db.query.farm.findFirst({
    where: eq(farm.id, farmId),
  });

  return res
    ? {
        id: res.id,
        name: res.name,
        description: res.description,
      }
    : undefined;
};
