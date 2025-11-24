import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lands } from './lands';
import { CreateLand } from './create-land/create-land';
import { EditLand } from './edit-land/edit-land';
import { DetailesLand } from './detailes-land/detailes-land';

const routes: Routes = [
  { path: '', component: Lands },
  { path: 'CreateLand', component: CreateLand },
  { path: 'EditLand', component: EditLand },
  { path: 'detailesLand', component: DetailesLand },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandsRoutingModule { }
