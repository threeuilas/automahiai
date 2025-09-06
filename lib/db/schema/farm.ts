import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers';

export const farm = pgTable('farm', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  ...timestamps,
});
