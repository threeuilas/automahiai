import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { farmUser } from '../schema/farmUser';
import { farm } from '../schema/farm';
import { Farm } from './types';

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
    createdAt: farm.createdAt,
  }));
};

export const createFarm = async (
  userId: string,
  farmInsert: typeof farm.$inferInsert,
): Promise<Farm> => {
  return await db.transaction(async (tx) => {
    // Create the farm
    const [newFarm] = await tx.insert(farm).values(farmInsert).returning();

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

export const getFarm = async (farmId: number): Promise<Farm | undefined> => {
  const res = await db.query.farm.findFirst({
    where: eq(farm.id, farmId),
  });

  return res
    ? {
        id: res.id,
        name: res.name,
        description: res.description,
        createdAt: res.createdAt,
      }
    : undefined;
};
