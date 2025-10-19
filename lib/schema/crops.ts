import z from 'zod';

import type { crop, timestamps } from '@/lib/db/schema';

const baseCropAttributesSchema = z.object({
  daysToMaturity: z.number(),
  quantityPerHarvest: z.number(),
  seedVendor: z.string(),
  seedsPerLinearFeet: z.number(),
  plantsPerLinearFeet: z.number(),
});

const continuousCropAttributesSchema = baseCropAttributesSchema.extend({
  type: z.literal('continuous_harvest'),
  daysBetweenHarvests: z.number(),
});

const harvestOnceCropAttributesSchema = baseCropAttributesSchema.extend({
  type: z.literal('harvest_once'),
});

export const CropAttributeSchema = z.union([
  continuousCropAttributesSchema,
  harvestOnceCropAttributesSchema,
]);

export const cropSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, 'Crop name is required')
    .max(100, 'Crop name must be less than 100 characters'),
  attributes: CropAttributeSchema,
}) satisfies z.ZodType<Omit<typeof crop.$inferSelect, keyof typeof timestamps>>;

export const insertCropSchema = cropSchema.omit({
  id: true,
}) satisfies z.ZodType<Omit<typeof crop.$inferInsert, keyof typeof timestamps>>;

export const createCropRequestSchema = z.object({
  name: z.string().min(1, 'Crop name is required'),
  attributes: CropAttributeSchema,
});

export const createCropResponseSchema = z.object({
  success: z.boolean(),
  id: z.number().optional(),
  error: z.string().optional(),
});

export type Crop = z.infer<typeof cropSchema>;
export type InsertCrop = z.infer<typeof insertCropSchema>;
export type CropAttributeSchemaType = z.infer<typeof CropAttributeSchema>;
export type CreateCropRequest = z.infer<typeof createCropRequestSchema>;
export type CreateCropResponse = z.infer<typeof createCropResponseSchema>;
