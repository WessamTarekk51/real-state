import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Incomes } from './incomes';
import { CreateIncome } from './create-income/create-income';
import { DetailesIncome } from './detailes-income/detailes-income';

const routes: Routes = [
    { path: '', component: Incomes },
    { path: 'create', component: CreateIncome },
    { path: 'detailes', component: DetailesIncome },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomesRoutingModule { }
