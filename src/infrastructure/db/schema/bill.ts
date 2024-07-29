import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"

import { usersTable } from "./auth"

export const billsTable = sqliteTable("bills", {
  id: integer("id").primaryKey()
})

export const itemsTable = sqliteTable("items", {
  id: integer("id").primaryKey(),
  billId: integer("bill_id")
    .references(() => billsTable.id, {
      onDelete: "cascade"
    })
    .notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  name: text("name").notNull()
})

export const userItemsTable = sqliteTable(
  "user_items",
  {
    userId: text("user_id")
      .references(() => usersTable.id, {
        onDelete: "cascade"
      })
      .notNull(),
    itemId: integer("item_id")
      .references(() => itemsTable.id, {
        onDelete: "cascade"
      })
      .notNull(),
    quantity: integer("quantity").notNull()
  },
  (table) => ({ pk: primaryKey({ columns: [table.userId, table.itemId] }) })
)
