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
  jobStatus: {
      ar: string,
      en: string
  }
}