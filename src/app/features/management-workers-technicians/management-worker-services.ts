import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { GetEmployeeRoot, WorkerDetailesRoot } from 'src/app/shared/models/customer/employess';
import { IResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagementWorkerServices {
  constructor(private http: HttpClient) {}
  baseURL = environment.baseURL;


  //worker
  GetWorkers(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.worker.workers}`;

    return this.http.get<GetEmployeeRoot>(url, {  params });
  }
  GetWorkerByID(id: string) {
    return this.http.get<WorkerDetailesRoot>(this.baseURL + ASSET.worker.workers + '/' + id);
  }
  CreateWorker(obj: any) {
    return this.http.post<IResult>(
      this.baseURL + ASSET.worker.workers + ASSET.worker.CreateWorker,
      obj
    );
  }
  UpdateWorker(id: any, obj: any) {
    return this.http.put<IResult>(
      this.baseURL +
        ASSET.worker.workers +
        '/' +
        id +
        ASSET.worker.UpdateWorker,
      obj
    );
  }
  DeleteWorker(id: string) {
    return this.http.delete<IResult>(
      this.baseURL +
        ASSET.worker.workers +
        '/' +
        id +
        ASSET.worker.DeleteWorker
    );
  }
  GetDropDownWorkers() {
    let params = new HttpParams()
      .set('pageSize', 0)
      .set('pageNumber', 0);
    const url = `${this.baseURL}${ASSET.worker.workers}`;
    return this.http.get<GetEmployeeRoot>(url, { params });
  }
}
