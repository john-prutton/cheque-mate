"use client"

import { memo, useCallback } from "react"

import { LucideTrash2 } from "lucide-react"

import { FloatingLabeledInput } from "@/components/floating-label-input"
import { Button } from "@/components/ui/button"

import { useReceipt } from "./store"

export const Item = ({
  index,
  item
}: {
  item: NewItem | Item
  index: number
}) => {
  const { updateItem, removeItem } = useReceipt()

  const handleChange = useCallback(
    (key: keyof NewItem, value: NewItem[keyof NewItem]) => {
      updateItem(index, { ...item, [key]: value })
    },
    [updateItem, item, index]
  )

  return (
    <div className="rounded border bg-muted/20 px-2 py-4">
      <div className="flex flex-row items-end gap-2">
        <FloatingLabeledInput
          label="Name"
          containerClassName="w-full"
          value={item.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <Button
          variant="ghost"
          size="icon"
          className="w-12 hover:bg-transparent"
          onClick={() => removeItem(index)}
        >
          <LucideTrash2 className="size-4 text-red-500" />
        </Button>
      </div>

      <div className="mt-2 flex flex-row gap-2 [&>*]:w-full">
        <FloatingLabeledInput
          label="Quantity"
          value={item.quantity}
          onChange={(e) => handleChange("quantity", +e.target.value)}
        />

        <FloatingLabeledInput
          label="Price"
          value={`R ${item.price}`}
          onChange={(e) => handleChange("price", +e.target.value.substring(2))}
        />
      </div>
    </div>
  )
}

export const MemoItem = memo(Item)
