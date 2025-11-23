import { IResult, Pagination } from "../result";
import { attachment } from "./attachment";

export interface CreateNewLand {
  name: string,
  governorateId: string,
  cityId: string,
  districtId: string,
  length: number,
  width: number,
  latitude: number,
  longitude: number,
  description: string,
  attachments: attachment[]
}


export interface GetLandsRoot extends IResult {
  value: GetLands
}


export interface GetLands extends Pagination {
  items: Land[]
}

export interface Land {

  id: string,
  number: string,
  name: string,
  district: {
    ar: string,
    en: string
  },
  city: {
    ar: string,
    en: string
  },
  governorate: {
    ar: string,
    en: string
  },
  area: number,
  buildingsCount: number,
  unitsCount: number,
  creationDate: string,
  location?: string,
  convertCreationDate?: string
}




