import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagement } from './user-management';

const routes: Routes = [
  { path: '', component: UserManagement },
  {
    path: 'roles',
    loadChildren: () =>
      import('./roles/roles-module').then((m) => m.RolesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users-module').then((m) => m.UsersModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
