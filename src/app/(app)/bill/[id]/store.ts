import { create } from "zustand"

type UserReceiptStore = {
  items: UserItem[]
  setItems: (items: UserItem[]) => void
  updateUserQuantity: (
    index: number,
    userQuantity: UserItem["userQuantity"]
  ) => void
}

export const useUserReceipt = create<UserReceiptStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  updateUserQuantity: (index, userQuantity) =>
    set((state) => {
      const items = [...state.items]
      items[index].userQuantity = userQuantity

      return {
        items
      }
    })
}))
