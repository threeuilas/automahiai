import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './helpers';
import { farmUser } from './farmUser';
import { farmCrop } from './crop';

export const farm = pgTable('farm', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  ...timestamps,
});

// Drizzle relations for farms
export const farmRelations = relations(farm, ({ many }) => ({
  farmUser: many(farmUser),
  farmCrop: many(farmCrop),
}));
