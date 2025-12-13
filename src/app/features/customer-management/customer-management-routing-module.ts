import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerManagement } from './customer-management';

const routes: Routes = [
  { path: '', component: CustomerManagement },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients-module').then((m) => m.ClientsModule),
  },
  {
    path: 'calls',
    loadChildren: () =>
      import('./calls/calls-module').then((m) => m.CallsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagementRoutingModule {}
