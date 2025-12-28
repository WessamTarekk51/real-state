import { attachment } from "../real-state/attachment";
import { IResult, Pagination } from "../result";

export interface CreateNewOutCome {
  beneficiaryId: string;
  expenseTypeId: string;
  buildingId: string;
  unitId: string;
  amount: number;
  paymentMethodId: string;
  paymentDate: string;
  notes: string;
  attachments: attachment[];
}


export interface GetOutComesRoot extends IResult {
  value: GetOutComes
}

export interface GetOutComes extends Pagination {
  items: OutCome[]
}

export interface OutCome {
  id: string,
  code: string,
  beneficiary: {
    ar: string,
    en: string
  },
  beneficiaryName:string
  expenseType: {
    ar: string,
    en: string
  }
  expenseTypeName:string
  buildingCode: string
  unitCode: string
  amount: number
  paymentDate: string
  convertPaymentDate: string
  paymentMethod: {
    ar: string,
    en: string
  }
  paymentMethodName:string

}



export interface OutComeDetailesRoot extends IResult {
  value: OutComeDetailes
}

export interface OutComeDetailes {

}