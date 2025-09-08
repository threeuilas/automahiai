import { z } from 'zod';
import { Farm, farmSchema, insertFarmSchema } from '@/lib/schema/farms';

const baseSuccessSchema = z.object({
  success: z.literal(true),
});
const baseFailureSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

// Create Farm Schemas and Types
export const createFarmRequestSchema = insertFarmSchema;

const createFarmSuccessSchema = z.object({
  ...farmSchema.shape,
  ...baseSuccessSchema.shape,
}) satisfies z.ZodType<Farm>;

export const createFarmResponseSchema = z.union([
  createFarmSuccessSchema,
  baseFailureSchema,
]);

export type CreateFarmRequest = z.infer<typeof createFarmRequestSchema>;
export type CreateFarmResponse = z.infer<typeof createFarmResponseSchema>;

// Delete Farm Schemas and Types
export const deleteFarmRequestSchema = farmSchema.pick({
  id: true,
});

export const deleteFarmResponseSchema = z.union([
  baseSuccessSchema,
  baseFailureSchema,
]);

export type DeleteFarmRequest = z.infer<typeof deleteFarmRequestSchema>;
export type DeleteFarmResponse = z.infer<typeof deleteFarmResponseSchema>;
