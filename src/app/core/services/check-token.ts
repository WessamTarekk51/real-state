import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AccountSevices } from 'src/app/features/account/account-sevices';
import { LoginUser, RootLoginUser, UserPermission } from 'src/app/shared/models/user/user';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';

@Injectable({ providedIn: 'root' })
export class CheckToken {

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<LoginUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private LoginSubject = new BehaviorSubject<boolean>(false);
  Login$ = this.LoginSubject.asObservable()




  constructor(private RealStateServices: RealStateServices, private accountService: AccountSevices) {
    this.checkToken();
  }

  private checkToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const loggedIn = !!token;
      // Redirect automatically
      if (loggedIn) {
        this.loadCurrentUser();
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.loadCurrentUser(); // بعد login
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    }
  }

  loadCurrentUser() {
    this.accountService.getCurrentUser()
      .pipe(
        tap(user => {
          this.getUserPermissions(user)
          this.LoginSubject.next(true)
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: () => this.logout()
      });
  }


  getPermissions(user: RootLoginUser) {
    this.RealStateServices.GetLookUpSetByCode('Permissions').subscribe(
      (res) => {
        if (res.isSuccess) {
          console.log(res.value.items)
          this.userPermission.permissionIds = this.userPermission.permissionIds
            .map(id => res.value.items.find(p => p.id === id)?.code)
            .filter(Boolean) as string[];
          user.value.permissionIds = this.userPermission.permissionIds;
          this.currentUserSubject.next(user.value);
        }
      }
    );
  }
  userPermission: UserPermission
  getUserPermissions(user: RootLoginUser) {
    this.accountService.getUserPermissions(user.value.roleId).subscribe(
      (res) => {
        this.userPermission = res.value;
        this.getPermissions(user)
        console.log(this.userPermission)
      }
    );
  }

}
