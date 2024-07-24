type Bill = {
  id: number
  items: Item[]
}

type NewBill = {
  items: NewItem[]
}

type Item = {
  id: number
  price: number
  quantity: number
  name: string
}
type NewItem = Omit<Item, "id">
