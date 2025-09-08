import {
  integer,
  pgTable,
  pgEnum,
  primaryKey,
  text,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './helpers';
import { farm } from './farm';
import { user } from './auth-schema';
import { FARM_USER_ROLES } from '@/lib/schema/farmUser';

// Enum for user roles in a farm
export const farmUserRoleEnum = pgEnum('farm_user_role', FARM_USER_ROLES);

// Junction table for user-farm relationships with role
export const farmUser = pgTable(
  'farm_user',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    farmId: integer('farm_id')
      .notNull()
      .references(() => farm.id),
    role: farmUserRoleEnum('role').notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.farmId, t.role] })],
);

// Drizzle relations for users
export const userRelations = relations(user, ({ many }) => ({
  farmUser: many(farmUser),
}));

// Drizzle relations for farm users
export const farmUsersRelations = relations(farmUser, ({ one }) => ({
  user: one(user, {
    fields: [farmUser.userId],
    references: [user.id],
  }),
  farm: one(farm, {
    fields: [farmUser.farmId],
    references: [farm.id],
  }),
}));
