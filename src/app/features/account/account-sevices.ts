import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { RootLoginUser, RootUserPermission } from 'src/app/shared/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountSevices {
  constructor(private http: HttpClient) { }
  baseURL = environment.baseURL;

  login(user: any) {
    return this.http.post<RootLoginUser>(this.baseURL + ASSET.identity.login, user);
  }
  getCurrentUser() {
    return this.http.get<RootLoginUser>(this.baseURL + ASSET.identity.currentUser);
  }

  getUserPermissions(roleId : string){
        return this.http.get<RootUserPermission>(this.baseURL + ASSET.role.Roles + '/'+roleId);
  }
}
