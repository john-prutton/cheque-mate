import "server-only"

import { billRepository } from "infra/db"

import { notFound } from "next/navigation"

import { getUser } from "@/auth/get-user"

export const getBill = async (id: Bill["id"]) => {
  try {
    return await billRepository.getBill(id)
  } catch (error) {
    if (error instanceof Error && error.message === "Bill not found") notFound()

    throw error
  }
}

export const getItemQuantities = async (billId: Bill["id"]) => {
  const user = await getUser()
  return await billRepository.getUserItemsForBill(user.id, billId)
}
