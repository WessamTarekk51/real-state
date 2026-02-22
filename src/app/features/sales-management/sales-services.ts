import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { ContractDetailesRoot, GetContractsRoot } from 'src/app/shared/models/contract';
import { IResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesServices {
  constructor(private http: HttpClient) {}
  baseURL = environment.baseURL;

  CreateContract(obj: any) {
    return this.http.post<IResult>(
      this.baseURL + ASSET.Contract.Contracts + ASSET.Contract.CreateContract,
      obj
    );
  }

  GetContracts(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.Contract.Contracts}`;

    return this.http.get<GetContractsRoot>(url, { params });
  }

  GetContractsByID(id: string) {
    return this.http.get<ContractDetailesRoot>(this.baseURL + ASSET.Contract.Contracts + '/' + id);
  }
}
