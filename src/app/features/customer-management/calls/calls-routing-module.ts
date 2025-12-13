import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Calls } from './calls';
import { CreateCall } from './create-call/create-call';

const routes: Routes = [
  { path: '', component: Calls },
  { path: 'create', component: CreateCall },
  // { path: 'detailes', component: DetailesClient },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallsRoutingModule { }
