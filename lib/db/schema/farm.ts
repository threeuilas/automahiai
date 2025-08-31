import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers';

export const farm = pgTable('farm', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  ...timestamps,
});
