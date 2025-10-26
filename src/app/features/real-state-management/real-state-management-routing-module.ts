import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealStateManagement } from './real-state-management';
import { Lands } from './lands/lands';

const routes: Routes = [
      { path: '', component: RealStateManagement },
      { path: 'lands', component: Lands },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealStateManagementRoutingModule { }
