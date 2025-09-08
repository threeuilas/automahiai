import 'server-only';
import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { farmUser } from '@/lib/db/schema';
import type { FarmUserRole } from '@/lib/schema/farmUser';

export const getFarmUserRole = async (
  userId: string,
  farmId: number,
): Promise<FarmUserRole | undefined> => {
  const res = await db.query.farmUser.findFirst({
    where: and(eq(farmUser.userId, userId), eq(farmUser.farmId, farmId)),
  });

  return res?.role;
};
