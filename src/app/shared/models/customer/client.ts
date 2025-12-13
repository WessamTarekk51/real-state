import { IResult, Pagination } from '../result';

export interface CreateNewClient {
  name: string;
  phone: string;
  email: string;
  nationalId: string;
  address: string;
  attachments: [{}];
}
export interface GetClientRoot extends IResult {
  value: GetClients;
}

export interface GetClients extends Pagination {
  items: Client[];
}

export interface Client {
  address: string;
  code: string;
  email:string;
  id: string;
  name: string;
  nationalId: string;
  phone: string;
}


export interface ClientDetailesRoot extends IResult {
  value: ClientDetailes
}

export interface ClientDetailes {
  id: string,
  name: string,
  phone: string,
  email: string,
  code: string,
  address: string,
  nationalId: string
}