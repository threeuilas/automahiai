import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { farmersTable } from "./farmers";

export const farmsTable = pgTable("farms", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  farmerId: integer().notNull().references(() => farmersTable.id),
  ...timestamps,
});