import { IResult, Pagination } from '../result';

export interface RootGovernorate extends IResult {
  value: Governorate;
}

export interface Governorate extends Pagination {
  items: GovernorateItem[];
}

export interface GovernorateItem {
  id: string;
  name: string;
  lookupSetId: string;
  code: string;
  descriptions: {
    ar: string;
    en: string;
  };
  isActive: boolean;
  sortOrder: number;
}
