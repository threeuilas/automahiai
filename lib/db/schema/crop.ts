import { integer, pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { CropAttributeSchemaType } from '@/lib/schema/crops';

import { timestamps } from './helpers';
import { farm } from './farm';

export const crop = pgTable('crop', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  attributes: jsonb('attributes').notNull().$type<CropAttributeSchemaType>(),
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
