import { billRepository } from "infra/db"

export default async function BillPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const bill = await billRepository.get(+id)

  if (bill.items.length === 0) {
    return <div>Bill not found</div>
  }

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
