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


