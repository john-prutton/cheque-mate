"use server"

import { createNewBill } from "use-cases/create-new-bill"
import { aiRepository } from "infra/ai"
import { billRepository } from "infra/db"

import { redirect } from "next/navigation"

export async function handleCreateNewBill({ images }: { images: string[] }) {
  const { id } = await createNewBill(
    { images },
    { Bill: billRepository, Ai: aiRepository }
  )

  redirect(`/bill/${id}`)
}
