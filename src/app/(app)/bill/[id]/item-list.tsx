"use client"

import { useEffect } from "react"

import { MemoItem } from "./item"
import { useUserReceipt } from "./store"

export const ItemList = ({ initialItems }: { initialItems: UserItem[] }) => {
  const { items, setItems } = useUserReceipt()
  console.log("rendering ItemList", items[0]?.userQuantity)

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <MemoItem
          key={item.id}
          index={index}
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          userQuantity={item.userQuantity}
        />
      ))}
    </div>
  )
}
