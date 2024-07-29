import { IBillRepository } from "domain/repositories"

type Inputs = { items: NewItem[] }
type Dependencies = { Bill: IBillRepository }
type Returns = Promise<{ id: Bill["id"] }>

export const createNewBill: UseCase<Inputs, Dependencies, Returns> = async (
  { items },
  { Bill }
) => {
  const id = await Bill.createBill({ items })

  return { id }
}
