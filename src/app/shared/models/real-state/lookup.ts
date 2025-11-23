import { IResult } from '../result';

export interface RootLookUp extends IResult {
  value: LookUp;
}

export interface LookUp {
  id: string,
  code: string,
  descriptions: {
    ar: string,
    en: string
  },
  isActive: boolean,
  createdDate: string,
  createdBy: string,
  updatedDate: string,
  modifiedBy: string,
  items: LookUpItem[];
}

export interface LookUpItem {
  id: string;
  name: string;
  code: string;
  descriptions: {
    ar: string;
    en: string;
  };
  isActive: boolean;
  sortOrder: number;
}
