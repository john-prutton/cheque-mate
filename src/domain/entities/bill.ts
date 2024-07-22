export type Bill = {
  id: number
  items: Item[]
}

export type NewBill = {
  items: NewItem[]
}

export type Item = {
  id: number
  price: number
  quantity: number
  name: string
}
export type NewItem = Omit<Item, "id">
