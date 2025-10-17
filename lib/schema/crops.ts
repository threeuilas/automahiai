import z from 'zod';

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

export type CropAttributeSchemaType = z.infer<typeof CropAttributeSchema>;

export const createCropRequestSchema = z.object({
  name: z.string().min(1, 'Crop name is required'),
  attributes: CropAttributeSchema,
});

export const createCropResponseSchema = z.object({
  success: z.boolean(),
  id: z.number().optional(),
  error: z.string().optional(),
});

export type CreateCropRequest = z.infer<typeof createCropRequestSchema>;
export type CreateCropResponse = z.infer<typeof createCropResponseSchema>;

