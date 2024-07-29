"use server"

import { analyzeReceipt } from "use-cases/analyze-receipt"
import { createNewBill } from "use-cases/create-new-bill"
import { aiRepository } from "infra/ai"
import { billRepository } from "infra/db"

import { redirect } from "next/navigation"

export async function handleAnalyzeReceipt({ images }: { images: string[] }) {
  const { items } = await analyzeReceipt({ images }, { Ai: aiRepository })

  return { items }
}
export async function handleCreateNewBill({ items }: { items: NewItem[] }) {
  const { id } = await createNewBill({ items }, { Bill: billRepository })

  redirect(`/bill/${id}`)
}
