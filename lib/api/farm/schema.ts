import { z } from 'zod';
import { farm } from '@/lib/db/schema/farm';

export const createFarmSchema = z.object({
  name: z
    .string()
    .min(1, 'Farm name is required')
    .max(100, 'Farm name must be less than 100 characters'),
  description: z.string().default(''),
}) satisfies z.ZodType<typeof farm.$inferInsert>;

export type CreateFarmRequest = z.infer<typeof createFarmSchema>;
export type CreateFarmResponse = CreateFarmSuccess | CreateFarmFailure;
interface CreateFarmSuccess {
  id: number;
  name: string;
  createdAt: Date;
  success: true;
}
interface CreateFarmFailure {
  success: false;
  error: string;
}

export const deleteFarmSchema = z.object({
  id: z.number(),
});

export type DeleteFarmRequest = z.infer<typeof deleteFarmSchema>;
export type DeleteFarmResponse = DeleteFarmSuccess | DeleteFarmFailure;
interface DeleteFarmSuccess {
  success: true;
}
interface DeleteFarmFailure {
  success: false;
  error: string;
}
