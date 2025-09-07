import z from 'zod';
import { farm } from '../../schema/farm';
import { timestamps } from '../../schema';

export const farmSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, 'Farm name is required')
    .max(100, 'Farm name must be less than 100 characters'),
  description: z.string(),
  createdAt: z.date(),
}) satisfies z.ZodType<
  Omit<typeof farm.$inferSelect, 'updatedAt' | 'deletedAt'>
>;

export const insertFarmSchema = farmSchema.omit({ id: true }).partial({
  description: true,
}) satisfies z.ZodType<Omit<typeof farm.$inferInsert, keyof typeof timestamps>>;

export type Farm = z.infer<typeof farmSchema>;
export type InsertFarm = z.infer<typeof insertFarmSchema>;
