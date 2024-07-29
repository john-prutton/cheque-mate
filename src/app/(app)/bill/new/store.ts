import { create } from "zustand"

type ReceiptStore = {
  items: NewItem[]
  setItems: (items: NewItem[]) => void
  addItem: (item: NewItem) => void
  updateItem: (index: number, item: NewItem) => void
  removeItem: (index: number) => void
}

export const useReceipt = create<ReceiptStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (index, item) =>
    set((state) => ({
      items: state.items.map((_, i) => (i === index ? item : _))
    })),
  removeItem: (index) =>
    set((state) => ({ items: state.items.filter((_, i) => i !== index) }))
}))
