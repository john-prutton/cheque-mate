"use client"

import { useState } from "react"

import { LucideLoader2 } from "lucide-react"

import { Button } from "@/app/_components/ui/button"

import { handleCreateNewBill } from "./action"
import { ImageInput } from "./image-input"

export function NewBillForm() {
  const [images, setImages] = useState<string[]>([])
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      return
    }

    setPending(true)

    try {
      await handleCreateNewBill({
        images
      })
    } catch (error) {
      alert("An error occurred while processing the bill.")
      console.error(error)
    }

    setPending(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ImageInput images={images} setImages={setImages} />

      <Button
        className="mt-16 w-full disabled:bg-primary/20 disabled:text-foreground"
        disabled={images.length === 0 || pending}
        type="submit"
      >
        Next
        {pending && <LucideLoader2 className="ml-2 animate-spin" />}
      </Button>
    </form>
  )
}
