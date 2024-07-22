import { Bill } from "@/domain/entities/bill"
import { IAIRepository } from "@/domain/repositories/ai"
import { IBillRepository } from "@/domain/repositories/database"

type Inputs = { images: string[] }
type Dependencies = { Bill: IBillRepository; Ai: IAIRepository }
type Returns = Promise<{ id: Bill["id"] }>

export const createNewBill: UseCase<Inputs, Dependencies, Returns> = async (
  { images },
  { Bill, Ai }
) => {
  const items = await Ai.analyzeReceipts(images)
  const id = await Bill.create({ items })

  return { id }
}
