import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers';

export const farmersTable = pgTable('farmers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 20 }).notNull(),
  ...timestamps,
});
