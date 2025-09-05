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
  // Create the farm
  const [newFarm] = await db
    .insert(farm)
    .values({
      name,
    })
    .returning();

  // Add the user as a farmer to the farm
  await db.insert(farmUser).values({
    userId,
    farmId: newFarm.id,
    role: 'farmer',
  });

  return {
    id: newFarm.id,
    name: newFarm.name,
    createdAt: newFarm.createdAt,
  };
};
