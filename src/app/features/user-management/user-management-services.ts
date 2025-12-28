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
  token = ASSET.token;
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // <-- add Bearer token
  });
  CreateRole(obj: any) {
    const headers = this.headers;
    return this.http.post<IResult>(this.baseURL + ASSET.role.Roles, obj, {
      headers,
    });
  }
  getDashboardRole() {
    const headers = this.headers;
    return this.http.get<RootDashboardRole>(
      this.baseURL + ASSET.role.Roles + ASSET.role.Dashboard,
      { headers }
    );
  }
  DeleteRole(id: any) {
    return this.http.delete<IResult>(
      this.baseURL + ASSET.role.Roles + '/' + id
    );
  }
  getRoles() {
    const headers = this.headers;
    return this.http.get<RootRole>(this.baseURL + ASSET.role.Roles, {
      headers,
    });
  }
  GetRoleByID(id: string) {
    const headers = this.headers;
    return this.http.get<RoleDetailesRoot>(
      this.baseURL + ASSET.role.Roles + '/' + id,
      { headers }
    );
  }
  EditRole(obj: any, roleId: string) {
    const headers = this.headers;
    return this.http.put<IResult>(
      this.baseURL + ASSET.role.Roles + '/' + roleId,
      obj,
      { headers }
    );
  }

  CreateUser(obj: any) {
    const headers = this.headers;
    return this.http.post<IResult>(this.baseURL + ASSET.role.Roles, obj, {
      headers,
    });
  }
}
