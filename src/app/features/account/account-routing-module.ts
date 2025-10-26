import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Account } from './account';

const routes: Routes = [
    { path: '', component: Account },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
