import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { Table } from "src/app/shared/components/table/table";
import { Button } from "src/app/shared/components/button/button";
import { MatDialog } from '@angular/material/dialog';
import { DeleteLand } from './delete-land/delete-land';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lands',
  imports: [InputTxt, InputDate, InputSelect, Table, Button],
  templateUrl: './lands.html',
  styleUrl: './lands.scss'
})
export class Lands {

  constructor(private dialog: MatDialog, private router:Router) {

  }

  deleteLand(data: any) {
    const dialogRef = this.dialog.open(DeleteLand, {
      data: { ...data },
      panelClass: 'center-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("close")
      }
    });
  }

  createLand() {
    this.router.navigate(['/real-state-management/lands/CreateLand']);
  }
}

