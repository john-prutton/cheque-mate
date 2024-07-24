export type IAIRepository = {
  analyzeReceipts: (images: string[]) => Promise<NewItem[]>
}
