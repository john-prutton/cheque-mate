import { sql } from "drizzle-orm"
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { Item } from "@/lib/schemas"

export const billsTable = sqliteTable("bills", {
  id: integer("id").primaryKey()
})

export const itemsTable = sqliteTable("items", {
  id: integer("id").primaryKey(),
  billId: integer("bill_id").references(() => billsTable.id, {
    onDelete: "cascade"
  }),
  price: real("price"),
  quantity: integer("quantity"),
  name: text("name")
})

const __itemTypeCheck: Pick<
  typeof itemsTable.$inferSelect,
  "name" | "price" | "quantity"
> = {} as Item
