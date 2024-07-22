import { z } from "zod"

export const itemSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number()
})
export type Item = z.infer<typeof itemSchema>
