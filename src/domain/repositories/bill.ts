export type IBillRepository = {
  createBill: (newBill: NewBill) => Promise<Bill["id"]>
  getBill: (id: Bill["id"]) => Promise<Bill>
  updateUserBillItemQuantity: (inputs: {
    userId: User["id"]
    itemId: Item["id"]
    quantity: Item["quantity"]
  }) => Promise<void>
  getUserItemsForBill: (
    userId: User["id"],
    billId: Bill["id"]
  ) => Promise<{ id: Item["id"]; quantity: Item["quantity"] }[]>
}
