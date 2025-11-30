import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { BuildingDetailesRoot, DropDownBuildingsRoot, GetBuildingsRoot } from 'src/app/shared/models/real-state/building';
import { DropDownLandsRoot, GetLandsRoot, LandDetailesRoot } from 'src/app/shared/models/real-state/land';
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
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // <-- add Bearer token
  });
  //buildings
  GetBuildings(pageSize: number, pageNumber: number, filters: any) {
    const headers = this.headers
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.buildings.Buildings}`;

    return this.http.get<GetBuildingsRoot>(url, { headers, params });
  }
  GetBuildingsByID(id: string) {
    const headers = this.headers
    return this.http.get<BuildingDetailesRoot>(this.baseURL + ASSET.buildings.Buildings + '/' + id, { headers });
  }
  CreateBuildings(obj: any) {
    const headers = this.headers
    return this.http.post<IResult>(this.baseURL + ASSET.buildings.CreateBuildings, obj, { headers });
  }
  UpdateBuildings(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.buildings.Buildings + '/' + id + '/update',
      obj
    );
  }
  DeleteBuildings(id: string) {
    const headers = this.headers
    return this.http.delete<IResult>(
      this.baseURL + ASSET.buildings.Buildings + '/' + id + ASSET.buildings.DeleteBuildings, { headers }
    );
  }
  getDropDownBuildings() {
    const headers = this.headers
    return this.http.get<DropDownBuildingsRoot>(this.baseURL + ASSET.buildings.Buildings + ASSET.buildings.AllBuildings, { headers });
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
    const url = `${this.baseURL}${ASSET.lands.Lands}`;

    return this.http.get<GetLandsRoot>(url, { headers, params });
  }
  GetLandsByID(id: string) {
    const headers = this.headers
    return this.http.get<LandDetailesRoot>(this.baseURL + ASSET.lands.Lands + '/' + id, { headers });
  }
  CreateLands(obj: any) {
    const headers = this.headers
    return this.http.post<IResult>(this.baseURL + ASSET.lands.Lands + ASSET.lands.CreateLands, obj, { headers });
  }
  UpdateLands(id: any, obj: any) {
    const headers = this.headers
    return this.http.put(
      this.baseURL + ASSET.lands.Lands + '/' + id + ASSET.lands.UpdateLands,
      obj, { headers }
    );
  }
  DeleteLands(id: string) {
    const headers = this.headers
    return this.http.delete<IResult>(
      this.baseURL + ASSET.lands.Lands + '/' + id + ASSET.lands.DeleteLands, { headers }
    );
  }
  getDropDownLands() {
    const headers = this.headers
    return this.http.get<DropDownLandsRoot>(this.baseURL + ASSET.lands.Lands + ASSET.lands.AllLands, { headers });
  }

  //units
  GetUnits() {
    return this.http.get(this.baseURL + ASSET.units.Units);
  }
  GetUnitsByID(id: number) {
    return this.http.get(this.baseURL + ASSET.units.Units + '/' + id);
  }
  CreateUnits(obj: any) {
    const headers = this.headers
    return this.http.post<IResult>(this.baseURL + ASSET.units.Units + ASSET.units.CreateUnits, obj, { headers });
  }
  UpdateUnits(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.units.Units + '/' + id + '/update',
      obj
    );
  }
  DeleteUnits(id: any) {
    return this.http.delete(
      this.baseURL + ASSET.units.Units + '/' + id + '/delete'
    );
  }

  //upload
  uploadDocument(data: any, code: string) {
    const headers = this.headers
    const url = `${this.baseURL}${ASSET.document.documnet}/${code}${ASSET.document.createDocumnet}`;
    return this.http.post<IStringResult>(url, data, { headers });
  }
  //lookup
  GetLookUpSetByCode(code: string) {
    const headers = this.headers
    const url = `${this.baseURL}${ASSET.lookup.getSetByCode}/${code}`;

    return this.http.get<RootLookUp>(url, { headers });
  }
  GetLookUpItemByCode(setCode: string, ItemCode: string) {
    const headers = this.headers
    const url = `${this.baseURL}${ASSET.lookup.getSetByCode}/${setCode}${ASSET.lookup.getItemByCode}/${ItemCode}`;

    return this.http.get<RootLookUp>(url, { headers });
  }

  DownloadDocmument(documnetId: string) {
    const headers = this.headers
    const url = `${this.baseURL}${ASSET.document.documnet}/${documnetId}`;
    return this.http.get(url, { headers, responseType: 'blob' });
  }
}
