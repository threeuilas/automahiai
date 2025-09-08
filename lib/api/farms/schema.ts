import { z } from 'zod';

import { farmSchema, insertFarmSchema } from '@/lib/schema/farms';

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
});

export const createFarmResponseSchema = z.union([
  createFarmSuccessSchema,
  baseFailureSchema,
]);

export type CreateFarmRequest = z.infer<typeof createFarmRequestSchema>;
export type CreateFarmResponse = z.infer<typeof createFarmResponseSchema>;

// Update Farm Schemas and Types
export const updateFarmRequestSchema = z.object({
  ...farmSchema.partial({ name: true, description: true }).shape,
});

const updateFarmSuccessSchema = z.object({
  ...farmSchema.shape,
  ...baseSuccessSchema.shape,
});

export const updateFarmResponseSchema = z.union([
  updateFarmSuccessSchema,
  baseFailureSchema,
]);

export type UpdateFarmRequest = z.infer<typeof updateFarmRequestSchema>;
export type UpdateFarmResponse = z.infer<typeof updateFarmResponseSchema>;

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
