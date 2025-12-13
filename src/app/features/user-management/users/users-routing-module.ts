import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './users';
import { CreateUser } from './create-user/create-user';

const routes: Routes = [
  {
    path : '' , component : Users
  },
  {
    path : 'create' , component : CreateUser
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
