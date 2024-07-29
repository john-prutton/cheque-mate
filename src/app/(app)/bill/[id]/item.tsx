"use client"

import { memo } from "react"

import { handleUpdateUserItemQuantity } from "./actions"
import { ItemCounter } from "./item-counter"
import { useUserReceipt } from "./store"

const Item = ({ index, ...item }: UserItem & { index: number }) => {
  const updateUserQuantity = useUserReceipt((state) => state.updateUserQuantity)

  const handleUpdate = async (newUserQuantity: number) => {
    await handleUpdateUserItemQuantity({
      itemId: item.id,
      quantity: newUserQuantity
    })
    updateUserQuantity(index, newUserQuantity)
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="w-full rounded bg-background p-2">
        <div>
          <h3 className="inline-block text-lg font-bold">{item.name}</h3>
          <span className="ml-2 text-muted-foreground">(x{item.quantity})</span>
        </div>

        <span>R{item.price}</span>
      </div>

      <ItemCounter
        available={item.quantity}
        user={item.userQuantity}
        updateCount={handleUpdate}
      />
    </div>
  )
}

export const MemoItem = memo(Item)
