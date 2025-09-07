import { z } from 'zod';
import { farm } from '@/lib/db/schema/farm';

// Create Farm Schemas and Types
export const createFarmRequest = z.object({
  name: z
    .string()
    .min(1, 'Farm name is required')
    .max(100, 'Farm name must be less than 100 characters'),
  description: z.string().default(''),
}) satisfies z.ZodType<typeof farm.$inferInsert>;

const createFarmSuccess = z.object({
  success: z.literal(true),
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
});

const createFarmFailure = z.object({
  success: z.literal(false),
  error: z.string(),
});

export const createFarmResponse = z.union([
  createFarmSuccess,
  createFarmFailure,
]);

export type CreateFarmRequest = z.infer<typeof createFarmRequest>;
export type CreateFarmResponse = z.infer<typeof createFarmResponse>;

// Delete Farm Schemas and Types
export const deleteFarmRequest = z.object({
  id: z.number(),
});

const deleteFarmSuccess = z.object({
  success: z.literal(true),
});

const deleteFarmFailure = z.object({
  success: z.literal(false),
  error: z.string(),
});

export const deleteFarmResponse = z.union([
  deleteFarmSuccess,
  deleteFarmFailure,
]);

export type DeleteFarmRequest = z.infer<typeof deleteFarmRequest>;
export type DeleteFarmResponse = z.infer<typeof deleteFarmResponse>;
