import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementWorkersTechnicians } from './management-workers-technicians';

const routes: Routes = [
  { path: '', component: ManagementWorkersTechnicians },
   { path: 'workers', loadChildren: () => import('./workers/workers-module').then(m => m.WorkersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementWorkersTechniciansRoutingModule { }
