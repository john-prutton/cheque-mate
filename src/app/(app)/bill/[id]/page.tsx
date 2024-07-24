import { billRepository } from "infra/db"

import { notFound } from "next/navigation"

import { ItemCounter } from "./item-counter"

async function getBill(id: Bill["id"]) {
  try {
    return await billRepository.get(id)
  } catch (error) {
    if (error instanceof Error && error.message === "Bill not found") notFound()

    throw error
  }
}

export default async function BillPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const bill = await getBill(+id)

  return (
    <main>
      <div className="space-y-4">
        {bill.items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 sm:flex-row">
            <div className="w-full rounded bg-background p-2">
              <div>
                <h3 className="inline-block text-lg font-bold">{item.name}</h3>
                <span className="ml-2 text-muted-foreground">
                  (x{item.quantity})
                </span>
              </div>

              <span>R{item.price}</span>
            </div>

            <ItemCounter available={item.quantity} />
          </div>
        ))}
      </div>
    </main>
  )
}
