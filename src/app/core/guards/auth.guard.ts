import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckToken } from '../services/check-token';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

 private router = inject(Router);
  private checkToken = inject(CheckToken);

  canActivate(): boolean {
    const isLoggedIn = !!this.checkToken.currentUser$;

    if (!isLoggedIn) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    return true;
  }
}
