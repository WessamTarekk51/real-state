import { Routes } from '@angular/router';
import { notLoggedGuard } from './core/guards/not-logged.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { Account } from './features/account/account';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  // notLoggedGuard
  { path: 'login', canActivate: [], component: Account },
  { path: 'real-state-management', canActivate: [AuthGuard], loadChildren: () => import('./features/real-state-management/real-state-management-module').then(m => m.RealStateManagementModule) },
  { path: 'customer-management', canActivate: [AuthGuard], loadChildren: () => import('./features/customer-management/customer-management-module').then(m => m.CustomerManagementModule) },
  { path: 'sales-management', canActivate: [AuthGuard], loadChildren: () => import('./features/sales-management/sales-management-module').then(m => m.SalesManagementModule) },
  { path: 'payments-management', canActivate: [AuthGuard], loadChildren: () => import('./features/payments-management/payments-management-module').then(m => m.PaymentsManagementModule) },
  { path: 'user-management', canActivate: [AuthGuard], loadChildren: () => import('./features/user-management/user-management-module').then(m => m.UserManagementModule) },
  { path: 'worker-management', canActivate: [AuthGuard], loadChildren: () => import('./features/management-workers-technicians/management-workers-technicians-module').then(m => m.ManagementWorkersTechniciansModule) },

];
// , canActivate: [NotLoggedGuard]
