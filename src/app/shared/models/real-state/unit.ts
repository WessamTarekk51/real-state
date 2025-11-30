import { attachment } from "./attachment";

export interface CreateNewUnit {
  name: string,
  buildingId: string,
  unitStatusId: string,
  floorNumber: number,
  area: number,
  numberOfRooms: number,
  numberOfBatEmployeeooms: number,
  unitTypeId: string,
  price: number,
  finishingTypeId:string,
  hasBalcony:boolean,
  hasGarage:boolean,
  hasCentralAC:boolean,
  description:string
  attachments: attachment[]
}


