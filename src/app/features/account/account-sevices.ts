import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASSET } from 'src/app/core/api/asset.const';
import { RootLoginUser } from 'src/app/shared/models/user/user';
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
    return this.http.get(this.baseURL + ASSET.identity.currentUser);

  }
}
