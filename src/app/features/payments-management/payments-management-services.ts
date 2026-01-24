import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { GetOutComes, GetOutComesRoot, OutComeDetailesRoot } from 'src/app/shared/models/payment/outCome';
import { IResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsManagementServices {
  constructor(private http: HttpClient) { }
  baseURL = environment.baseURL;

  CreateOutcome(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.OutCome.OutComes + ASSET.OutCome.CreateOutCome, obj);
  }
  GetOutcomes(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.OutCome.OutComes}${ASSET.OutCome.GetOutComes}`;

    return this.http.get<GetOutComesRoot>(url, {  params });
  }
  GetOutcomeByID(id: string) {
    return this.http.get<OutComeDetailesRoot>(this.baseURL + ASSET.OutCome.OutComes + '/' + id + ASSET.OutCome.GetOutComeByID);
  }
}
