import { IBillRepository } from "domain/repositories"
import { IAIService } from "domain/services/ai"

type Inputs = { images: string[] }
type Dependencies = { Bill: IBillRepository; Ai: IAIService }
type Returns = Promise<{ id: Bill["id"] }>

export const createNewBill: UseCase<Inputs, Dependencies, Returns> = async (
  { images },
  { Bill, Ai }
) => {
  const items = await Ai.analyzeReceipts(images)
  const id = await Bill.create({ items })

  return { id }
}
