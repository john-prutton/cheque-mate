"use client"

import { useState } from "react"

import { LucideLoader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { handleCreateNewBill } from "./actions"
import { ImageInput } from "./image-input"
import { MemoItem } from "./item"
import { useReceipt } from "./store"

export default function NewBillPage() {
  const { items, setItems } = useReceipt()
  const [pending, setPending] = useState(false)

  const handleSubmit = async () => {
    setPending(true)

    try {
      await handleCreateNewBill({ items })
      toast.success("Bill created successfully")
    } catch (error) {
      toast.error("Failed to create bill")
      console.log(error)
    }

    setPending(false)
  }

  return (
    <main>
      <h1 className="mb-8 text-3xl font-black tracking-wider">New Bill</h1>

      {items.length === 0 ? (
        <div className="space-y-4">
          <ImageInput />

          <Button
            variant={"link"}
            className="h-fit w-full p-0"
            onClick={() =>
              setItems([{ name: "New item", price: 0, quantity: 0 }])
            }
          >
            Add manually instead
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => (
              <MemoItem key={index} item={item} index={index} />
            ))}
          </div>

          <Button
            variant={"link"}
            className="mt-4 h-fit w-full p-0"
            onClick={() =>
              setItems([...items, { name: "New item", price: 0, quantity: 0 }])
            }
          >
            Add new item
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={pending}
            className="mt-8 w-full"
          >
            {!pending ? (
              "Create New Bill"
            ) : (
              <LucideLoader2 className="size-6 animate-spin" />
            )}
          </Button>
        </>
      )}
    </main>
  )
}
