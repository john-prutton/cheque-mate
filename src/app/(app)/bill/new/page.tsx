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
  const { items } = useReceipt()
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
        <ImageInput />
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => (
              <MemoItem key={index} item={item} index={index} />
            ))}
          </div>

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
