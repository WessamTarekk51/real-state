import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AccountSevices } from 'src/app/features/account/account-sevices';

@Injectable({ providedIn: 'root' })
export class CheckToken {

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private accountService: AccountSevices) {
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
        tap(user => this.currentUserSubject.next(user))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: () => this.logout()
      });
  }



}
