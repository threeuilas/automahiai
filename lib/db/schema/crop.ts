import { integer, pgTable, pgEnum, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './helpers';
import { farm } from './farm';

// Enum for crop harvest types
export const cropHarvestTypeEnum = pgEnum('crop_harvest_type', [
  'harvest_once',
  'continuous_harvest',
]);

export const crop = pgTable('crop', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  type: cropHarvestTypeEnum('type').notNull(),
  daysToMaturity: integer('days_to_maturity').notNull(),
  daysBetweenHarvests: integer('days_between_harvests'), // Only for continuous harvest
  seedsPerLinearFeet: integer('seeds_per_linear_feet').notNull(),
  plantsPerLinearFeet: integer('plants_per_linear_feet').notNull(),
  seedVendor: text('seed_vendor').notNull(),
  ...timestamps,
});

// Junction table for farm-crop relationships
export const farmCrop = pgTable('farm_crop', {
  farmId: integer('farm_id')
    .notNull()
    .references(() => farm.id),
  cropId: integer('crop_id')
    .notNull()
    .references(() => crop.id),
  ...timestamps,
});

// Drizzle relations for crops
export const cropRelations = relations(crop, ({ many }) => ({
  farmCrop: many(farmCrop),
}));

// Drizzle relations for farm crops
export const farmCropRelations = relations(farmCrop, ({ one }) => ({
  farm: one(farm, {
    fields: [farmCrop.farmId],
    references: [farm.id],
  }),
  crop: one(crop, {
    fields: [farmCrop.cropId],
    references: [crop.id],
  }),
}));
