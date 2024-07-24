export type IAIService = {
  analyzeReceipts: (images: string[]) => Promise<NewItem[]>
}
