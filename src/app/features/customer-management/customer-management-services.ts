import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { ClientDetailesRoot, DropDownClientsRoot, GetClientRoot } from 'src/app/shared/models/customer/client';
import { IResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerManagementServices {
  constructor(private http: HttpClient) {}
  baseURL = environment.baseURL;

  CreateClient(obj: any) {
    return this.http.post<IResult>(
      this.baseURL + ASSET.client.Clients + ASSET.client.CreateClients,
      obj
    );
  }
  GetClient(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.client.Clients}`;

    return this.http.get<GetClientRoot>(url, { params });
  }
  DeleteClient(id: string) {
    return this.http.delete<IResult>(
      this.baseURL + ASSET.client.Clients + '/' + id + ASSET.client.DeleteClients

    );
  }
  GetClientByID(id: string) {
    return this.http.get<ClientDetailesRoot>(this.baseURL + ASSET.client.Clients + '/' + id);
  }
  getDropDownClients() {
    return this.http.get<DropDownClientsRoot>(this.baseURL + ASSET.client.Clients + ASSET.client.AllClients);
  }
}
