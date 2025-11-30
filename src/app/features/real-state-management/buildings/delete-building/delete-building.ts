import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Button } from "src/app/shared/components/button/button";
import { Building } from 'src/app/shared/models/real-state/building';

@Component({
  selector: 'app-delete-building',
  imports: [Button],
  templateUrl: './delete-building.html',
  styleUrl: './delete-building.scss'
})
export class DeleteBuilding {
  @Output() deleteEvent = new EventEmitter<Building>();
  @Output() cancleEvent = new EventEmitter<Building>();
  constructor(
    private dialogRef: MatDialogRef<DeleteBuilding>,
    @Inject(MAT_DIALOG_DATA) public item: Building
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
