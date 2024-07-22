import { NewItem } from "../entities/bill"

export type IAIRepository = {
  analyzeReceipts: (images: string[]) => Promise<NewItem[]>
}
