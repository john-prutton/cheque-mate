"use server"

import { openai } from "@ai-sdk/openai"
import { CoreMessage, generateObject, ImagePart } from "ai"
import { z } from "zod"

import { itemSchema } from "@/lib/schemas"

export async function createNewBill({
  numberOfPeople,
  images
}: {
  numberOfPeople: number
  images: string[]
}) {
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

  return items.object.items
}
