import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealStateManagement } from './real-state-management';

const routes: Routes = [
      { path: '', component: RealStateManagement },
      { path: 'lands', loadChildren: () => import('./lands/lands-module').then(m => m.LandsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealStateManagementRoutingModule { }
