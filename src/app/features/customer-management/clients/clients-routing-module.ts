import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Clients } from './clients';
import { CreateClient } from './create-client/create-client';

const routes: Routes = [
  { path: '', component: Clients },
  { path: 'create', component: CreateClient },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
