import { IResult, Pagination } from "../result";
import { attachment } from "./attachment";

export interface CreateNewBuilding {
  name: string,
  landId: string,
  numberOfFloors: number,
  numberOfUnits: number,
  constructionYear: string,
  buildingStatusId: string,
  length: number,
  width: number,
  description: string,
  attachments: attachment[]
}

export interface GetBuildingsRoot extends IResult {
  value: GetBuildings
}


export interface GetBuildings extends Pagination {
  items: Building[]
}

export interface Building {
  id: string,
  number: string,
  name: string,
  landName: string,
  numberOfFloors: number,
  numberOfUnits: number,
  constructionYear: string,
  creationDate: string,
  convertConstructionYear?: string,
  convertCreationDate?: string,
  buildingStatus: {
    ar: string,
    en: string
  }
  area: number,
  buildingStatusName?: string
}


export interface BuildingDetailesRoot extends IResult {
  value: BuildingDetailes
}

export interface BuildingDetailes {
  id: string,
  name: string,
  number: string,
  landName: string
  numberOfFloors: number,
  numberOfUnits: number,
  constructionYear: string,
  buildingStatus: {
    ar: string,
    en: string
  },
  length: number,
  width: number,
  description: string,
  attachments: Attachment[]
}


export interface Attachment {
  elementId: string;
  attachmentId?: string;
  attachmentIds?: string[];
}


export interface DropDownBuildingsRoot extends IResult {
  value: DropDownBuildings[]
}

export interface DropDownBuildings {
  id: string,
  name: string,
}


