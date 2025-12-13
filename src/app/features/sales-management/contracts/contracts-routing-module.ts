import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateContract } from './create-contract/create-contract';
import { Contracts } from './contracts';

const routes: Routes = [
  { path: '', component: Contracts },
  { path: 'create', component: CreateContract },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
