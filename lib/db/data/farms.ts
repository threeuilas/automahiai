import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { farmUser } from '../schema/farmUser';
import { farm } from '../schema/farm';
import { Farm } from './types';

export const getUserFarms = async (userId: string): Promise<Farm[]> => {
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
    createdAt: farm.createdAt,
  }));
};

export const createFarm = async (
  name: string,
  userId: string,
): Promise<Farm> => {
  return await db.transaction(async (tx) => {
    // Create the farm
    const [newFarm] = await tx
      .insert(farm)
      .values({
        name,
      })
      .returning();

    // Add the user as a farmer to the farm
    await tx.insert(farmUser).values({
      userId,
      farmId: newFarm.id,
      role: 'farmer',
    });

    return {
      id: newFarm.id,
      name: newFarm.name,
      createdAt: newFarm.createdAt,
    };
  });
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
