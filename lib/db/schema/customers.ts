import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers';

export const customersTable = pgTable('customers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 20 }).notNull(),
  ...timestamps,
});
