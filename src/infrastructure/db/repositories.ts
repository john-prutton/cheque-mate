import type { IBillRepository } from "domain/repositories/database"
import { eq } from "drizzle-orm"

import { db } from "./db"
import { billsTable, itemsTable } from "./schema"

export const billRepository: IBillRepository = {
  create: async (newBill) => {
    const [{ id }] = await db
      .insert(billsTable)
      .values({})
      .returning({ id: billsTable.id })

    await db
      .insert(itemsTable)
      .values(newBill.items.map((item) => ({ ...item, billId: id })))

    return id
  },

  get: async (id) => {
    const [bill] = await db
      .select()
      .from(billsTable)
      .where(eq(billsTable.id, id))

    const items = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.billId, id))
      .then((data) =>
        data.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.name
        }))
      )

    return {
      ...bill,
      items
    }
  }
}
