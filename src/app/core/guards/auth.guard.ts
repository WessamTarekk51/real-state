import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckToken } from '../services/check-token';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private router = inject(Router);
  private checkToken = inject(CheckToken);

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await firstValueFrom(this.checkToken.currentUser$);
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}
