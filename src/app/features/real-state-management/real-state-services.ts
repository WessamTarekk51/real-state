import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { BuildingDetailesRoot, DropDownBuildingsRoot, GetBuildingsRoot } from 'src/app/shared/models/real-state/building';
import { DropDownLandsRoot, GetLandsRoot, LandDetailesRoot } from 'src/app/shared/models/real-state/land';
import { RootLookUp } from 'src/app/shared/models/real-state/lookup';
import { DropDownUnitRoot, GetUnitsRoot } from 'src/app/shared/models/real-state/unit';
import { IResult, IStringResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RealStateServices {
  constructor(private http: HttpClient) { }
  baseURL = environment.baseURL;

  //buildings
  GetBuildings(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.buildings.Buildings}`;

    return this.http.get<GetBuildingsRoot>(url, { params });
  }
  GetBuildingsByID(id: string) {
    return this.http.get<BuildingDetailesRoot>(this.baseURL + ASSET.buildings.Buildings + '/' + id);
  }
  CreateBuildings(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.buildings.Buildings + ASSET.buildings.CreateBuildings, obj);
  }
  UpdateBuildings(id: any, obj: any) {
    return this.http.put<IResult>(
      this.baseURL + ASSET.buildings.Buildings + '/' + id + '/update',
      obj
    );
  }
  DeleteBuildings(id: string) {
    return this.http.delete<IResult>(
      this.baseURL + ASSET.buildings.Buildings + '/' + id + ASSET.buildings.DeleteBuildings
    );
  }
  getDropDownBuildings() {
    return this.http.get<DropDownBuildingsRoot>(this.baseURL + ASSET.buildings.Buildings + ASSET.buildings.AllBuildings);
  }

  //lands
  GetLands(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.lands.Lands}`;

    return this.http.get<GetLandsRoot>(url, {  params });
  }
  GetLandsByID(id: string) {
    return this.http.get<LandDetailesRoot>(this.baseURL + ASSET.lands.Lands + '/' + id);
  }
  CreateLands(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.lands.Lands + ASSET.lands.CreateLands, obj);
  }
  UpdateLands(id: any, obj: any) {
    return this.http.put<IResult>(
      this.baseURL + ASSET.lands.Lands + '/' + id + ASSET.lands.UpdateLands,
      obj
    );
  }
  DeleteLands(id: string) {
    return this.http.delete<IResult>(
      this.baseURL + ASSET.lands.Lands + '/' + id + ASSET.lands.DeleteLands
    );
  }
  getDropDownLands() {
    return this.http.get<DropDownLandsRoot>(this.baseURL + ASSET.lands.Lands + ASSET.lands.AllLands);
  }

  //units
  GetUnits(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.units.Units}`;

    return this.http.get<GetUnitsRoot>(url, {  params });
  }
  GetUnitsByBuildingID(pageSize: number, pageNumber: number, filters: any) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != '' && key !== 'pageSize' && key !== 'pageNumber') {
        params = params.set(key, String(value));
      }
    });
    const url = `${this.baseURL}${ASSET.units.Units}`;

    return this.http.get<GetUnitsRoot>(url, { params });
  }
  GetUnitsByID(id: number) {
    return this.http.get(this.baseURL + ASSET.units.Units + '/' + id);
  }
  CreateUnits(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.units.Units + ASSET.units.CreateUnits, obj);
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
  getDropDownUnits() {
    return this.http.get<DropDownUnitRoot>(this.baseURL + ASSET.units.Units + ASSET.units.AllUnits);
  }

  //upload
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
    const url = `${this.baseURL}${ASSET.document.documnet}/${documnetId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
