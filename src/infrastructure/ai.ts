import { openai } from "@ai-sdk/openai"
import { CoreMessage, generateObject, ImagePart } from "ai"
import { IAIRepository } from "domain/repositories/ai"
import { z } from "zod"

export const aiRepository: IAIRepository = {
  analyzeReceipts: async (images: string[]) => {
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

    const {
      object: { items }
    } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        items: z.array(
          z.object({
            name: z.string(),
            price: z.number(),
            quantity: z.number()
          })
        )
      }),
      messages
    })

    return items
  }
}
