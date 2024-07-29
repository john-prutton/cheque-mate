import { IAIService } from "domain/services/ai"

type Inputs = { images: string[] }
type Dependencies = { Ai: IAIService }
type Returns = Promise<{ items: NewItem[] }>

export const analyzeReceipt: UseCase<Inputs, Dependencies, Returns> = async (
  { images },
  { Ai }
) => {
  const items = await Ai.analyzeReceipts(images)
  return { items }
}
