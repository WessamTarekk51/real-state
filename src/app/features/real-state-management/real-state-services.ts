import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { GetLandsRoot, LandDetailesRoot } from 'src/app/shared/models/real-state/land';
import { RootLookUp } from 'src/app/shared/models/real-state/lookup';
import { IResult, IStringResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RealStateServices {
  constructor(private http: HttpClient) { }
  baseURL = environment.baseURL;
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUZXJyYUxpbmsiLCJleHAiOjE3NjYwMTIzNDIsImlhdCI6MTc2MzM4NDM0MiwianRpIjoiYjFkOWIxN2YtYTIwNC00NWQyLThhNTktOTg3OGU4MWQ5NTZjIiwiYXVkIjoiVGVycmFMaW5rQVBJIiwic3ViIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AdGVycmFsaW5rLmxvY2FsIiwibmFtZSI6IlN5c3RlbSBBZG1pbiIsInBob25lIjoiMDAwLTAwMDAtMDAwMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3NjMzODQzNDJ9.c8ITT0Ywqj9_2mTWqklFhS6v0fM-CrPIT1yd7XAoy0Y';
  //buildings
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // <-- add Bearer token
  });
  GetBuildings() {
    let pageSize = 10;
    let pageNumber = 1;
    const url = `${this.baseURL}${ASSET.buildings.Buildings}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return this.http.get(url);
  }
  GetBuildingsByID(id: number) {
    return this.http.get(this.baseURL + ASSET.buildings.Buildings + '/' + id);
  }
  CreateBuildings(obj: any) {

    return this.http.post<IResult>(this.baseURL + ASSET.buildings.CreateBuildings, obj,);
  }
  UpdateBuildings(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.buildings.Buildings + '/' + id + '/update',
      obj
    );
  }
  DeleteBuildings(id: any) {
    return this.http.delete(
      this.baseURL + ASSET.buildings.Buildings + '/' + id + '/delete'
    );
  }

  //lands
  GetLands(pageSize: number, pageNumber: number, filters: any) {
    const headers = this.headers
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.lands.GetLands}`;

    return this.http.get<GetLandsRoot>(url, { headers, params });
  }
  GetLandsByID(id: string) {
    const headers = this.headers
    return this.http.get<LandDetailesRoot>(this.baseURL + ASSET.lands.GetLands + '/' + id, { headers });
  }
  CreateLands(obj: any) {

    return this.http.post<IResult>(this.baseURL + ASSET.lands.CreateLands, obj);
  }
  UpdateLands(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.lands.GetLands + '/' + id + '/update',
      obj
    );
  }
  DeleteLands(id: any) {
    return this.http.delete(
      this.baseURL + ASSET.lands.GetLands + '/' + id + '/delete'
    );
  }

  //units
  GetUnits() {
    return this.http.get(this.baseURL + ASSET.units.GetUnits);
  }
  GetUnitsByID(id: number) {
    return this.http.get(this.baseURL + ASSET.units.GetUnits + '/' + id);
  }
  CreateUnits(obj: any) {
    return this.http.post(this.baseURL + ASSET.units.CreateUnits, obj);
  }
  UpdateUnits(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.units.GetUnits + '/' + id + '/update',
      obj
    );
  }
  DeleteUnits(id: any) {
    return this.http.delete(
      this.baseURL + ASSET.units.GetUnits + '/' + id + '/delete'
    );
  }

  //upload
  uploadBulidingPermit(data: any) {
    return this.http.post<IStringResult>(
      this.baseURL + ASSET.document.createDocumnetBulidingPermit,
      data
    );
  }
  uploadOwnershipCertificate(data: any) {

    return this.http.post(
      this.baseURL + ASSET.document.createDocumnetOwnershipCertificate,
      data
    );
  }
  uploadOwnershipContract(data: any) {

    return this.http.post(
      this.baseURL + ASSET.document.createDocumnetOwnershipContract,
      data
    );
  }
  uploadRealStateRegistrationDocuments(data: any) {
    return this.http.post(
      this.baseURL +
      ASSET.document.createDocumnetRealStateRegistrationDocuments,
      data
    );
  }
  uploadDocument(data: any, code: string) {
    const url = `${this.baseURL}${ASSET.document.documnet}/${code}${ASSET.document.createDocumnet}`;
    return this.http.post<IStringResult>(url, data);
  }
  //lookup
  GetLookUpSetByCode(code: string) {
    const url = `${this.baseURL}${ASSET.lookup.getSetByCode}/${code}`;

    return this.http.get<RootLookUp>(url);
  }
  GetLookUpItemByCode(setCode: string, ItemCode: string) {
    const url = `${this.baseURL}${ASSET.lookup.getSetByCode}/${setCode}${ASSET.lookup.getItemByCode}/${ItemCode}`;

    return this.http.get<RootLookUp>(url);
  }

  DownloadDocmument(documnetId: string) {
    const headers = this.headers
    const url = `${this.baseURL}${ASSET.document.documnet}/${documnetId}`;
    return this.http.get(url,{headers, responseType: 'blob'});
  }
}
