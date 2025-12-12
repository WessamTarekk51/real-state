import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/shared/models/customer/client';
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-delete-client',
  imports: [Button],
  templateUrl: './delete-client.html',
  styleUrl: './delete-client.scss'
})
export class DeleteClient {
  @Output() deleteEvent = new EventEmitter<Client>();
  @Output() cancleEvent = new EventEmitter<Client>();
  constructor(
    private dialogRef: MatDialogRef<DeleteClient>,
    @Inject(MAT_DIALOG_DATA) public item: Client
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
