import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUnit } from './create-unit/create-unit';
import { EditUnit } from './edit-unit/edit-unit';
import { DetailesUnit } from './detailes-unit/detailes-unit';
import { Units } from './units';

const routes: Routes = [
   { path: '', component: Units },
    { path: 'createUnit', component: CreateUnit },
    { path: 'editUnit', component: EditUnit},
    { path: 'detailesUnit', component: DetailesUnit },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
