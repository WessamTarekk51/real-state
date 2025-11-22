import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { RootCity } from 'src/app/shared/models/real-state/city';
import { RootDistrict } from 'src/app/shared/models/real-state/district';
import { RootGovernorate } from 'src/app/shared/models/real-state/governorate';
import { IResult, IStringResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RealStateServices {
  constructor(private http: HttpClient) {}
  baseURL = environment.baseURL;
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUZXJyYUxpbmsiLCJleHAiOjE3NjYwMTIzNDIsImlhdCI6MTc2MzM4NDM0MiwianRpIjoiYjFkOWIxN2YtYTIwNC00NWQyLThhNTktOTg3OGU4MWQ5NTZjIiwiYXVkIjoiVGVycmFMaW5rQVBJIiwic3ViIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AdGVycmFsaW5rLmxvY2FsIiwibmFtZSI6IlN5c3RlbSBBZG1pbiIsInBob25lIjoiMDAwLTAwMDAtMDAwMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3NjMzODQzNDJ9.c8ITT0Ywqj9_2mTWqklFhS6v0fM-CrPIT1yd7XAoy0Y';

  //buildings
  GetBuildings() {
    let pageSize = 10;
    let pageNumber = 1;
    const url = `${this.baseURL}${ASSET.buildings.Buildings}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    // Set Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.get(url, { headers });
  }
  GetBuildingsByID(id: number) {
    return this.http.get(this.baseURL + ASSET.buildings.Buildings + '/' + id);
  }
  CreateBuildings(obj: any) {
    return this.http.post(this.baseURL + ASSET.buildings.CreateBuildings, obj);
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
  GetLands() {
    return this.http.get(this.baseURL + ASSET.lands.GetLands);
  }
  GetLandsByID(id: number) {
    return this.http.get(this.baseURL + ASSET.lands.GetLands + '/' + id);
  }
  CreateLands(obj: any) {
    // const url = `${this.baseURL}${ASSET.buildings.Buildings}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    // Set Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    // return this.http.get(url, { headers });

    return this.http.post<IResult>(this.baseURL + ASSET.lands.CreateLands, obj, {
      headers,
    });
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.post<IStringResult>(
      this.baseURL + ASSET.document.createDocumnetBulidingPermit,
      data,
      { headers }
    );
  }
  uploadOwnershipCertificate(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.post(
      this.baseURL + ASSET.document.createDocumnetOwnershipCertificate,
      data,
      { headers }
    );
  }
  uploadOwnershipContract(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.post(
      this.baseURL + ASSET.document.createDocumnetOwnershipContract,
      data,
      { headers }
    );
  }
  uploadRealStateRegistrationDocuments(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.post(
      this.baseURL +
        ASSET.document.createDocumnetRealStateRegistrationDocuments,
      data,
      { headers }
    );
  }

  //lookup
  GetGovernorate() {
    const url = `${this.baseURL}${
      ASSET.lookup.getGovernorate
    }?pageSize=${100}&pageNumber=${1}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.get<RootGovernorate>(url, { headers });
  }
  GetCity() {
    const url = `${this.baseURL}${
      ASSET.lookup.getCity
    }?pageSize=${100}&pageNumber=${1}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.get<RootCity>(url, { headers });
  }
  GetDistrict() {
    const url = `${this.baseURL}${
      ASSET.lookup.getDistrict
    }?pageSize=${100}&pageNumber=${1}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // <-- add Bearer token
    });
    return this.http.get<RootDistrict>(url, { headers });
  }
}
