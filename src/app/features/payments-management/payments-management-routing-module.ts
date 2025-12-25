import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsManagement } from './payments-management';

const routes: Routes = [
  { path: '', component: PaymentsManagement },
  { path: 'incomes', loadChildren: () => import('./incomes/incomes-module').then(m => m.IncomesModule) },
  { path: 'outcomes', loadChildren: () => import('./outcomes/outcomes-module').then(m => m.OutcomesModule) },
  { path: 'installments', loadChildren: () => import('./installments/installments-module').then(m => m.InstallmentsModule) },
  { path: 'privateOutcomes', loadChildren: () => import('./private-outcomes/private-outcomes-module').then(m => m.PrivateOutcomesModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsManagementRoutingModule { }
