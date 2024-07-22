"use server"

import { redirect } from "next/navigation"

import { aiRepository } from "@/infrastructure/ai"
import { billRepository } from "@/infrastructure/db"
import { createNewBill } from "@/use-cases/create-new-bill"

export async function handleCreateNewBill({ images }: { images: string[] }) {
  const { id } = await createNewBill(
    { images },
    { Bill: billRepository, Ai: aiRepository }
  )

  redirect(`/bill/${id}`)
}
