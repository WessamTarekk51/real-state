import { Routes } from '@angular/router';
import { NotLoggedGuard } from './core/guards/not-logged.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { Account } from './features/account/account';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'login', canActivate: [NotLoggedGuard], component: Account },
  { path: 'real-state-management', canActivate: [NotLoggedGuard], loadChildren: () => import('./features/real-state-management/real-state-management-module').then(m => m.RealStateManagementModule) },
  { path: 'customer-management', canActivate: [NotLoggedGuard], loadChildren: () => import('./features/customer-management/customer-management-module').then(m => m.CustomerManagementModule) },
  { path: 'sales-management', canActivate: [NotLoggedGuard], loadChildren: () => import('./features/sales-management/sales-management-module').then(m => m.SalesManagementModule) },
  { path: 'payments-management', canActivate: [NotLoggedGuard], loadChildren: () => import('./features/payments-management/payments-management-module').then(m => m.PaymentsManagementModule) },
  { path: 'user-management', canActivate: [NotLoggedGuard], loadChildren: () => import('./features/user-management/user-management-module').then(m => m.UserManagementModule) },
  { path: 'worker-management', canActivate: [NotLoggedGuard], loadChildren: () => import('./features/management-workers-technicians/management-workers-technicians-module').then(m => m.ManagementWorkersTechniciansModule) },

];
// , canActivate: [NotLoggedGuard]
