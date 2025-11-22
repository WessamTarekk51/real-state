export interface IResult {
  isSuccess: boolean;
  errorCode: number;
  status: string;
  errorMessage: string;
  code: string;
  description: string;
  detail: string;
  errorTitle: string;
}

export interface IStringResult extends IResult {
  value: string;
}


export interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}

