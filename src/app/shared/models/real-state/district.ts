import { IResult, Pagination } from '../result';

export interface RootDistrict extends IResult {
  value: District;
}

export interface District extends Pagination  {
  items: DistrictItem[];
}

export interface DistrictItem {
  id: string;
  name:string;
  lookupSetId: string;
  code: string;
  descriptions: {
    ar: string;
    en: string;
  };
  isActive: boolean;
  sortOrder: number;
}
