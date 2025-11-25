import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Button } from "src/app/shared/components/button/button";
import { Land } from 'src/app/shared/models/real-state/land';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-land',
  imports: [Button],
  templateUrl: './delete-land.html',
  styleUrl: './delete-land.scss'
})
export class DeleteLand {
  @Output() deleteEvent = new EventEmitter<Land>();
  @Output() cancleEvent = new EventEmitter<Land>();
  constructor(
    private dialogRef: MatDialogRef<DeleteLand>,
    @Inject(MAT_DIALOG_DATA) public item: Land
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
