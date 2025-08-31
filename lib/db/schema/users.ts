
import { integer, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./helpers";
import { farmsTable } from "./farms";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 20 }).notNull(),
  ...timestamps,
});

// Enum for user roles in a farm
export const farmUserRoleEnum = pgEnum("farm_user_role", ["farmer", "customer"]);

// Junction table for user-farm relationships with role
export const farmUsersTable = pgTable("farm_users", {
  userId: integer().notNull().references(() => usersTable.id),
  farmId: integer().notNull().references(() => farmsTable.id),
  role: farmUserRoleEnum("role").notNull(),
});

// Drizzle relations for usersTable
export const usersRelations = relations(usersTable, ({ many }) => ({
  farmUsers: many(farmUsersTable),
}));


// Drizzle relations for farmUsersTable
export const farmUsersRelations = relations(farmUsersTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [farmUsersTable.userId],
    references: [usersTable.id],
  }),
  farm: one(farmsTable, {
    fields: [farmUsersTable.farmId],
    references: [farmsTable.id],
  }),
}));