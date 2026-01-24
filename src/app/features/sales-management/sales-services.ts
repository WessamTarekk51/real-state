import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
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
}
