import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsManagement } from './payments-management';

const routes: Routes = [
  { path: '', component: PaymentsManagement },
  { path: 'incomes', loadChildren: () => import('./incomes/incomes-module').then(m => m.IncomesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsManagementRoutingModule { }
