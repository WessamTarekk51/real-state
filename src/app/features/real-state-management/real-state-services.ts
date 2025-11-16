import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RealStateServices {
  constructor(private http: HttpClient) { }
  baseURL = environment.baseURL;

  //buildings
  GetBuildings() {
    let pageSize = 10
    let pageNumber = 1
    const url = `${this.baseURL}${ASSET.buildings.Buildings}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    console.log(url)
    return this.http.get(url);
  }
  GetBuildingsByID(id: number) {
    return this.http.get(
      this.baseURL + ASSET.buildings.Buildings + "/" + id
    );
  }
  CreateBuildings(obj: any) {
    return this.http.post(
      this.baseURL + ASSET.buildings.CreateBuildings, obj
    );
  }
  UpdateBuildings(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.buildings.Buildings + "/" + id + "/update", obj
    );
  }
  DeleteBuildings(id: any) {
    return this.http.delete(
      this.baseURL + ASSET.buildings.Buildings + "/" + id + "/delete"
    );
  }


  //lands
  GetLands() {
    return this.http.get(
      this.baseURL + ASSET.lands.GetLands
    );
  }
  GetLandsByID(id: number) {
    return this.http.get(
      this.baseURL + ASSET.lands.GetLands + "/" + id
    );
  }
  CreateLands(obj: any) {
    return this.http.post(
      this.baseURL + ASSET.lands.CreateLands, obj
    );
  }
  UpdateLands(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.lands.GetLands + "/" + id + "/update", obj
    );
  }
  DeleteLands(id: any) {
    return this.http.delete(
      this.baseURL + ASSET.lands.GetLands + "/" + id + "/delete"
    );
  }


  //units
  GetUnits() {
    return this.http.get(
      this.baseURL + ASSET.units.GetUnits
    );
  }
  GetUnitsByID(id: number) {
    return this.http.get(
      this.baseURL + ASSET.units.GetUnits + "/" + id
    );
  }
  CreateUnits(obj: any) {
    return this.http.post(
      this.baseURL + ASSET.units.CreateUnits, obj
    );
  }
  UpdateUnits(id: any, obj: any) {
    return this.http.put(
      this.baseURL + ASSET.units.GetUnits + "/" + id + "/update", obj
    );
  }
  DeleteUnits(id: any) {
    return this.http.delete(
      this.baseURL + ASSET.units.GetUnits + "/" + id + "/delete"
    );
  }
}
