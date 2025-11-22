import { IResult, Pagination } from '../result';



export interface CreateNewLand   {
  name: string,
  governorateId: string,
  cityId: string,
  districtId: string,
  length: number,
  width: number,
  latitude: number,
  longitude: number,
  description: string,
  attachments:attachment[]
}

export interface attachment   {
    elementId: string,
    attachmentId: string,
}