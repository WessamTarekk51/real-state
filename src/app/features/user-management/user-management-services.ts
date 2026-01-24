import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { IResult } from 'src/app/shared/models/result';
import {
  RoleDetailesRoot,
  RootDashboardRole,
  RootRole,
} from 'src/app/shared/models/user/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementServices {
  constructor(private http: HttpClient) {}
  baseURL = environment.baseURL;

  CreateRole(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.role.Roles, obj);
  }
  getDashboardRole() {
    return this.http.get<RootDashboardRole>(
      this.baseURL + ASSET.role.Roles + ASSET.role.Dashboard

    );
  }
  DeleteRole(id: any) {
    return this.http.delete<IResult>(
      this.baseURL + ASSET.role.Roles + '/' + id
    );
  }
  getRoles() {
    return this.http.get<RootRole>(this.baseURL + ASSET.role.Roles);
  }
  GetRoleByID(id: string) {
    return this.http.get<RoleDetailesRoot>(
      this.baseURL + ASSET.role.Roles + '/' + id
    );
  }
  EditRole(obj: any, roleId: string) {
    return this.http.put<IResult>(
      this.baseURL + ASSET.role.Roles + '/' + roleId,
      obj
    );
  }

  CreateUser(obj: any) {
    return this.http.post<IResult>(this.baseURL + ASSET.role.Roles, obj);
  }
}
