import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'src/app/shared/components/button/button';
import { UserManagementServices } from '../user-management-services';
import { RoleDistribution } from 'src/app/shared/models/user/role';
import { NgFor } from '@angular/common';
import { DeleteRole } from './delete-role/delete-role';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-roles',
  imports: [Button, NgFor],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles {
  pageTitle: string = ' الادوار ';
  roleDistributions: RoleDistribution[];
  dialogRef: any;

  constructor(private cd: ChangeDetectorRef, private dialog: MatDialog, private router: Router, private UserManagementServices: UserManagementServices) { }
  ngOnInit(): void {
    this.getDashboard()
  }
  createRole() {
    this.router.navigate(['/user-management/roles/create']);
  }
  editRole(role: RoleDistribution) {
    this.router.navigate(['/user-management/roles/edit'],{
      queryParams: { id: role.roleId},
    });
  }

  getDashboard() {
    this.UserManagementServices.getDashboardRole().subscribe(res => {
      if (res.isSuccess) {
        this.roleDistributions = res.value.roleDistribution
      }
      this.cd.markForCheck();
    })
  }
  deleteRole(role: RoleDistribution) {
    this.dialogRef = this.dialog.open(DeleteRole, {
      data: { ...role },
      panelClass: 'center-dialog'
    });
    this.dialogRef.componentInstance.cancleEvent.subscribe(() => {
      this.dialogRef.close();
    });
    this.dialogRef.componentInstance.deleteEvent.subscribe((role: RoleDistribution) => {
      this.delete(role)
    });

  }
  delete(role: RoleDistribution) {
    this.UserManagementServices.DeleteRole(role.roleId).subscribe(res => {
      console.log(res)
      res.isSuccess ? [this.dialogRef.close(), this.getDashboard()] : ''
    })
  }
}
