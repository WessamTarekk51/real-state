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
  token = ASSET.token;
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // <-- add Bearer token
  });
  CreateContract(obj: any) {
    const headers = this.headers;
    return this.http.post<IResult>(
      this.baseURL + ASSET.Contract.Contracts + ASSET.Contract.CreateContract,
      obj,
      { headers }
    );
  }
}
