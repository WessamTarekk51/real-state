import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateOutcomes } from './private-outcomes';
import { CreatePrivateOutcome } from './create-private-outcome/create-private-outcome';
import { DetailesPrivateOutcome } from './detailes-private-outcome/detailes-private-outcome';

const routes: Routes = [
  { path: '', component: PrivateOutcomes },
  { path: 'create', component: CreatePrivateOutcome },
  { path: 'detailes', component: DetailesPrivateOutcome },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateOutcomesRoutingModule { }
