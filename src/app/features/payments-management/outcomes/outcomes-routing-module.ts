import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Outcomes } from './outcomes';
import { CreateOutcome } from './create-outcome/create-outcome';
import { DetailesOutcome } from './detailes-outcome/detailes-outcome';

const routes: Routes = [
  { path: '', component: Outcomes },
  { path: 'create', component: CreateOutcome },
  { path: 'detailes', component: DetailesOutcome },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomesRoutingModule { }
