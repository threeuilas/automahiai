import z from 'zod';
import type { farmUser, timestamps } from '@/lib/db/schema';

export const FARM_USER_ROLES = ['farmer', 'customer'] as const;

export const farmUserSchema = z.object({
  userId: z.string(),
  farmId: z.number(),
  role: z.enum(FARM_USER_ROLES),
}) satisfies z.ZodType<
  Omit<typeof farmUser.$inferSelect, keyof typeof timestamps>
>;

export type FarmUser = z.infer<typeof farmUserSchema>;
export type FarmUserRole = FarmUser['role'];
