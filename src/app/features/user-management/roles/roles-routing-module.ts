import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from './roles';
import { CreateRole } from './create-role/create-role';

const routes: Routes = [
  {
    path : '' , component : Roles
  },
  {
    path : 'create' , component : CreateRole
  },
  {
    path : 'edit' , component : CreateRole
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
