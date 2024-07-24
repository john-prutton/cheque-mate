import { billRepository } from "infra/db"

import { notFound } from "next/navigation"

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
      <h1>Bill: {id}</h1>

      <div>
        {bill.items.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.quantity}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
