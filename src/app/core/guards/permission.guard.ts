import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CheckToken } from '../services/check-token';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  private router = inject(Router);
  private checkToken = inject(CheckToken);

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const user = await firstValueFrom(this.checkToken.currentUser$);
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredPermissions: string[] = route.data['permissions'] || [];
    if (requiredPermissions.length === 0) return true; // الصفحة مش مقيدة

    const hasPermission = requiredPermissions.some(p => (user.permissionIds || []).includes(p));
    if (!hasPermission) {
      this.router.navigate(['/home']); // لو مش عنده permission
    }
    return hasPermission;
  }
}
