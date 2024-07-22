"use server"

import { redirect } from "next/navigation"

import { aiRepository } from "infra/ai"
import { billRepository } from "infra/db"
import { createNewBill } from "use-cases/create-new-bill"

export async function handleCreateNewBill({ images }: { images: string[] }) {
  const { id } = await createNewBill(
    { images },
    { Bill: billRepository, Ai: aiRepository }
  )

  redirect(`/bill/${id}`)
}
