import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users", {
  id: text("id").notNull().primaryKey(), // oauthId
  name: text("name").notNull(),
  email: text("email").notNull().unique()
})

export const sessionsTable = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull()
})
