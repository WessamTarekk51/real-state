import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleDistribution } from 'src/app/shared/models/user/role';
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-delete-role',
  imports: [Button],
  templateUrl: './delete-role.html',
  styleUrl: './delete-role.scss'
})
export class DeleteRole {
  @Output() deleteEvent = new EventEmitter<RoleDistribution>();
  @Output() cancleEvent = new EventEmitter<RoleDistribution>();
  constructor(
    private dialogRef: MatDialogRef<DeleteRole>,
    @Inject(MAT_DIALOG_DATA) public item: RoleDistribution
  ) { }
  ngOnInit(): void {
    console.log("Dialog received:", this.item);
  }
  delete() {
    this.deleteEvent.emit(this.item);
  }

  cancle() {
    this.cancleEvent.emit(this.item);
  }
}
