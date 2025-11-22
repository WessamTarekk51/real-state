import { IResult, Pagination } from '../result';

export interface RootCity extends IResult {
  value: City;
}

export interface City extends Pagination  {
  items: CityItem[];
}

export interface CityItem {
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
