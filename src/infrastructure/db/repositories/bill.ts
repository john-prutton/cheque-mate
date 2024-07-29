import type { IBillRepository } from "domain/repositories"

import { and, eq, inArray } from "drizzle-orm"

import { db } from "../db"
import { billsTable, itemsTable, userItemsTable } from "../schema"

export const billRepository: IBillRepository = {
  createBill: async (newBill) => {
    const [{ id }] = await db
      .insert(billsTable)
      .values({})
      .returning({ id: billsTable.id })

    await db
      .insert(itemsTable)
      .values(newBill.items.map((item) => ({ ...item, billId: id })))

    return id
  },

  getBill: async (id) => {
    const [bill] = await db
      .select()
      .from(billsTable)
      .where(eq(billsTable.id, id))

    if (!bill) throw new Error("Bill not found")

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
  },

  updateUserBillItemQuantity: async ({ userId, itemId, quantity }) => {
    await db
      .insert(userItemsTable)
      .values({ userId, itemId, quantity })
      .onConflictDoUpdate({
        set: { quantity },
        target: [userItemsTable.userId, userItemsTable.itemId]
      })
  },

  getUserItemsForBill: async (userId, billId) => {
    const items = await db
      .select()
      .from(userItemsTable)
      .where(
        and(
          eq(userItemsTable.userId, userId),
          inArray(
            userItemsTable.itemId,
            db
              .select({ id: itemsTable.id })
              .from(itemsTable)
              .where(eq(itemsTable.billId, billId))
          )
        )
      )
      .then((items) =>
        items.map((item) => ({ id: item.itemId, quantity: item.quantity }))
      )

    return items
  }
}
