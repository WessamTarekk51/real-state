import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Installments } from './installments';
import { CreateInstallment } from './create-installment/create-installment';
import { DetailesInstallment } from './detailes-installment/detailes-installment';

const routes: Routes = [
  { path: '', component: Installments },
  { path: 'create', component: CreateInstallment },
  { path: 'detailes', component: DetailesInstallment },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallmentsRoutingModule { }
