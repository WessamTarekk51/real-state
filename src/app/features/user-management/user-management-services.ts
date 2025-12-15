import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { IResult } from 'src/app/shared/models/result';
import { RootDashboardRole } from 'src/app/shared/models/user/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServices {
  constructor(private http: HttpClient) { }
  baseURL = environment.baseURL;
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUZXJyYUxpbmsiLCJleHAiOjE3NjYwMTIzNDIsImlhdCI6MTc2MzM4NDM0MiwianRpIjoiYjFkOWIxN2YtYTIwNC00NWQyLThhNTktOTg3OGU4MWQ5NTZjIiwiYXVkIjoiVGVycmFMaW5rQVBJIiwic3ViIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AdGVycmFsaW5rLmxvY2FsIiwibmFtZSI6IlN5c3RlbSBBZG1pbiIsInBob25lIjoiMDAwLTAwMDAtMDAwMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3NjMzODQzNDJ9.c8ITT0Ywqj9_2mTWqklFhS6v0fM-CrPIT1yd7XAoy0Y';
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // <-- add Bearer token
  });
  CreateRole(obj: any) {
    const headers = this.headers;
    return this.http.post<IResult>(
      this.baseURL + ASSET.role.Roles,
      obj,
      { headers }
    );
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
}
