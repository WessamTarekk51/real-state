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





export interface LandDetailesRoot extends IResult {
  value: LandDetailes
}

export interface LandDetailes {

  name: string,
  districtName: {
    ar: string,
    en: string
  },
  cityName: {
    ar: string,
    en: string
  },
  governorateName: {
    ar: string,
    en: string
  },
  length: number,
  width: number,
  latitude: number,
  longitude: number,
  description: string,
  attachments: Attachment[]
}

export interface Attachment {
  elementId: string;
  attachmentId?: string;
  attachmentIds?: string[];
}



export interface DropDownLandsRoot extends IResult {
  value: DropDownLands[]
}

export interface DropDownLands {
  id: string,
  name: string,
}



