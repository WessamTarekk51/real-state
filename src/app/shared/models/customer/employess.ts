import { IResult, Pagination } from "../result";

export interface GetEmployeeRoot extends IResult {
  value: GetEmployees;
}

export interface GetEmployees extends Pagination {
  items: Employee[];
}

export interface Employee {
  id: string,
  name: string,
  phone: string,
  code: string,
  createdDate: string,
  convertCreationDate?: string,
  jobStatus: {
    ar: string,
    en: string
  }
  jobStatusName?: string
}


export interface WorkerDetailesRoot extends IResult {
  value: WorkerDetailes
}

export interface WorkerDetailes {
  name: string,
  id: string,
  phone: string,
  code: string,
  createdDate: string,
  convertCreationDate?: string,

}
