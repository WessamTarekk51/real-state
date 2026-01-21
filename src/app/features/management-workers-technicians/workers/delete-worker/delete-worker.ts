import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/shared/models/customer/employess';
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-delete-worker',
  imports: [Button],
  templateUrl: './delete-worker.html',
  styleUrl: './delete-worker.scss'
})
export class DeleteWorker {
  @Output() deleteEvent = new EventEmitter<Employee>();
  @Output() cancleEvent = new EventEmitter<Employee>();
  constructor(
    private dialogRef: MatDialogRef<DeleteWorker>,
    @Inject(MAT_DIALOG_DATA) public item: Employee
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
