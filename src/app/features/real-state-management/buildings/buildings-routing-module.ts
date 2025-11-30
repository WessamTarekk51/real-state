import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Buildings } from './buildings';
import { CreateBuilding } from './create-building/create-building';
import { EditBuilding } from './edit-building/edit-building';
import { DetailesBuilding } from './detailes-building/detailes-building';

const routes: Routes = [
  { path: '', component: Buildings },
  { path: 'createBuilding', component: CreateBuilding },
  { path: 'editBuilding', component: EditBuilding},
  { path: 'detailesBuilding', component: DetailesBuilding },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }
