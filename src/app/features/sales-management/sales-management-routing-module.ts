import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesManagement } from './sales-management';

const routes: Routes = [
  { path: '', component: SalesManagement },
  {
    path: 'contracts',
    loadChildren: () =>
      import('./contracts/contracts-module').then((m) => m.ContractsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesManagementRoutingModule { }
