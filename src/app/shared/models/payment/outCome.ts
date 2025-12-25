import { attachment } from "../real-state/attachment";

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