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

  // income
  CreateIncome(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.InCome.InComes + ASSET.InCome.CreateInCome, obj);
  }
  GetIncomes(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.InCome.InComes}`;

    return this.http.get(url, {  params });
  }
  GetIncomeByID(id: string) {
    return this.http.get(this.baseURL + ASSET.InCome.InComes + '/' + id + ASSET.InCome.GetInComeByID);
  }


  //outcome
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


  // installment
  CreateInstallment(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.Installment.Installments + ASSET.Installment.CreateInstallment, obj);
  }
  GetInstallments(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.Installment.Installments}${ASSET.Installment.GetInstallments}`;

    return this.http.get(url, {  params });
  }
  GetInstallmentByID(id: string) {
    return this.http.get(this.baseURL + ASSET.Installment.Installments + '/' + id + ASSET.Installment.GetInstallmentByID);
  }



  // Private
  CreatePrivate(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.Privates.Privates + ASSET.Privates.CreatePrivate, obj);
  }
  GetPrivates(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.Privates.Privates}${ASSET.Privates.GetPrivates}`;

    return this.http.get(url, {  params });
  }
  GetPrivateByID(id: string) {
    return this.http.get(this.baseURL + ASSET.Privates.Privates + '/' + id + ASSET.Privates.GetPrivateByID);
  }
}
