import { IBillRepository } from "domain/repositories"

type Inputs = {
  userId: User["id"]
  itemId: Item["id"]
  quantity: Item["quantity"]
}
type Dependencies = { BillRepository: IBillRepository }
type Returns = Promise<void>

export const updateUserItemQuantity: UseCase<
  Inputs,
  Dependencies,
  Returns
> = async ({ userId, itemId, quantity }, { BillRepository }) => {
  // would normally check if user is part of this bill
  // and if the item is part of this bill

  await BillRepository.updateUserBillItemQuantity({
    userId,
    itemId,
    quantity
  })
}
