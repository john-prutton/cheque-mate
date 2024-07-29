import { getBill, getItemQuantities } from "./api"
import { ItemList } from "./item-list"

export default async function BillPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const [bill, itemQuantities] = await Promise.all([
    getBill(+id),
    getItemQuantities(+id)
  ])

  const userItems: UserItem[] = bill.items.map((item) => {
    const userQuantityIndex = itemQuantities.findIndex((i) => i.id === item.id)
    const userQuantity =
      userQuantityIndex !== -1 ? itemQuantities[userQuantityIndex].quantity : 0
    itemQuantities.splice(userQuantityIndex, 1)

    return {
      ...item,
      userQuantity
    }
  })

  return (
    <main>
      <ItemList initialItems={userItems} />
    </main>
  )
}
