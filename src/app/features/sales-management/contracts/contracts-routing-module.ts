import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateContract } from './create-contract/create-contract';
import { Contracts } from './contracts';
import { DetailesContract } from './detailes-contract/detailes-contract';

const routes: Routes = [
  { path: '', component: Contracts },
  { path: 'create', component: CreateContract },
  { path: 'detailes', component: DetailesContract },
  { path: 'edit', component: CreateContract },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
