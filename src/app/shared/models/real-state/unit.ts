import { IResult, Pagination } from '../result';
import { attachment } from './attachment';

export interface CreateNewUnit {
  name: string;
  buildingId: string;
  unitStatusId: string;
  floorNumber: number;
  area: number;
  numberOfRooms: number;
  numberOfBatEmployeeooms: number;
  unitTypeId: string;
  price: number;
  finishingTypeId: string;
  hasBalcony: boolean;
  hasGarage: boolean;
  hasCentralAC: boolean;
  description: string;
  attachments: attachment[];
}
export interface GetUnitsRoot extends IResult {
  value: GetUnits;
}

export interface GetUnits extends Pagination {
  items: Unit[];
}

export interface Unit {
  area: number;
  building: string;
  floorNumber: number;
  id: string;
  land: string;
  name: string;
  number: string;
  numberOfBatEmployeeooms: number;
  numberOfRooms: number;
  price: number;
  status: {
    ar: string;
    en: string;
  };
  unitStatusName?: string

}
export interface DropDownUnitRoot extends IResult {
  value: DropDownUnits[]
}

export interface DropDownUnits {
  id: string,
  name: string,
}
