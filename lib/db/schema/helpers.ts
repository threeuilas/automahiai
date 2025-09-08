import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  updatedAt: timestamp('updated_at', { mode: 'string' }).$onUpdate(
    () => sql`CURRENT_TIMESTAMP`,
  ),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { mode: 'string' }),
};
