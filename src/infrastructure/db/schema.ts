import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

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
