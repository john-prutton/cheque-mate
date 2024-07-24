export type IBillRepository = {
  create: (newBill: NewBill) => Promise<Bill["id"]>
  get: (id: Bill["id"]) => Promise<Bill>
}
