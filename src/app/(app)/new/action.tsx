"use server"

import { redirect } from "next/navigation"

import { openai } from "@ai-sdk/openai"
import { CoreMessage, generateObject, ImagePart } from "ai"
import { z } from "zod"

import { db } from "@/lib/db"
import { billsTable, itemsTable } from "@/lib/db/schema"
import { itemSchema } from "@/lib/schemas"

export async function createNewBill({ images }: { images: string[] }) {
  const userContent: ImagePart[] = images.map((image) => ({
    type: "image",
    image
  }))

  const messages: CoreMessage[] = [
    {
      role: "system",
      content: "Please extract the items from the user's bill."
    },
    {
      role: "user",
      content: userContent
    }
  ]

  const items = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({ items: z.array(itemSchema) }),
    messages
  })

  const [{ id: billId }] = await db.insert(billsTable).values({}).returning()
  console.log(billId)
  const _ = await db.insert(itemsTable).values(
    items.object.items.map((item) => ({
      billId,
      ...item
    }))
  )

  redirect(`/bill/${billId}`)
}
