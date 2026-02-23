import { attachment } from "./real-state/attachment"
import { IResult, Pagination } from "./result"

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


export interface GetContractsRoot extends IResult {
  value: GetContracts
}


export interface GetContracts extends Pagination {
  items: Contract[]
}

export interface Contract {
  id: string,
  contractNumber: string,
  clientName: string,
  landName: string,
  buildingName: string,
  unitName: string,
  contractType: string,
  contractDate: string,
  convertcontractDate?:string,
  totalPrice: number,
  unitPriceAtContract?: number,
  isInstallmentPlan: boolean,
  notes?: string
  createdDate?: string
}

export interface ContractDetailesRoot extends IResult {
  value: ContractDetailes
}

export interface ContractDetailes {
  id: string,
  contractNumber: string,
  clientId:string
  clientName: string,
  clientEmail: string,
  clientNationalId:string,
  clientPhone:string,
  landName: string,
  landId:string,
  buildingName: string,
  buildingId:string,
  unitId:string,
  unitName: string,
  unitArea:number,
  unitPrice:number,
  unitType:string,
  floorNumber: number,
  contractDate: string,
  contractTypeId:string,
  contractTypeName:string,
  convertcontractDate?:string,
  totalPrice: number,
  unitPriceAtContract?: number,
  isInstallmentPlan: boolean,
  notes?: string
  createdDate?: string
  paymentMethodId:string,
  paymentMethodName:string,
  attachments: attachment[],
  installments: Installment[]


}







export interface DropDownContractsRoot extends IResult {
  value: DropDownContracts[]
}

export interface DropDownContracts {
  id: string,
  name: string,
}