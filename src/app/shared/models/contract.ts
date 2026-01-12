import { attachment } from "./real-state/attachment"

export interface CreateNewContract{
  contractDate: string,
  totalPrice: number,
  contractTypeId: string,
  clientNationalId: string,
  notes: string,
  landId: string,
  buildingId: string,
  unitId: string,
  employeeId: string,
  unitPriceAtContract: number,
  isInstallmentPlan: boolean,
  installments: Installment[]
  attachments: attachment[]
}

export interface Installment{
  description: string,
  dueDate: string,
  amount: number,
  amountText: string
}