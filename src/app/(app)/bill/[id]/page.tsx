import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { itemsTable } from "@/lib/db/schema"

export default async function BillPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const billItems = await db
    .select()
    .from(itemsTable)
    .where(eq(itemsTable.billId, +id))
    .catch((error) => {
      console.error(error)
      return []
    })

  if (billItems.length === 0) {
    return <div>Bill not found</div>
  }

  return (
    <main>
      <h1>Bill: {id}</h1>

      <div>
        {billItems.map((item) => (
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
