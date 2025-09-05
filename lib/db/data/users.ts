import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { farmUser } from '../schema/farmUser';

export const getUserFarms = async (userId: string) => {
  const res = await db.query.farm.findMany({
    with: {
      farmUser: {
        where: eq(farmUser.userId, userId),
      },
    },
  });

  return res;
};
