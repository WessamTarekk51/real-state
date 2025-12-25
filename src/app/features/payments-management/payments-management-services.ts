import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { IResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsManagementServices {
  constructor(private http: HttpClient) { }
  baseURL = environment.baseURL;
  token = ASSET.token;
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // <-- add Bearer token
  });
  CreateOutcome(obj: any) {
    const headers = this.headers
    return this.http.post<IResult>(this.baseURL + ASSET.OutCome.OutComes + ASSET.OutCome.CreateOutCome, obj, { headers });
  }
  GetOutcomes(pageSize: number, pageNumber: number, filters: any) {
    const headers = this.headers
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.OutCome.OutComes}${ASSET.OutCome.GetOutComes}`;

    return this.http.get(url, { headers, params });
  }
}
