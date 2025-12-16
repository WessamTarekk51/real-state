import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Workers } from './workers';
import { CreateWorker } from './create-worker/create-worker';
import { DetailesWorker } from './detailes-worker/detailes-worker';

const routes: Routes = [
  {
    path: '', component: Workers
  },
  {
    path: 'create', component: CreateWorker
  },
  {
    path: 'detailes', component: DetailesWorker
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
