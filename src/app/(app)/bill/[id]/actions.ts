"use server"

import { updateUserItemQuantity } from "use-cases/update-user-item-quantity"
import { billRepository } from "infra/db"

import { getUser } from "@/auth/get-user"

export const handleUpdateUserItemQuantity = async ({
  itemId,
  quantity
}: {
  itemId: Item["id"]
  quantity: Item["quantity"]
}) => {
  const user = await getUser()
  await updateUserItemQuantity(
    { userId: user.id, itemId, quantity },
    { BillRepository: billRepository }
  )
}
