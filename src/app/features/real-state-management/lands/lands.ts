import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { Table } from "src/app/shared/components/table/table";
import { Button } from "src/app/shared/components/button/button";
import { MatDialog } from '@angular/material/dialog';
import { DeleteLand } from './delete-land/delete-land';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RealStateServices } from '../real-state-services';
import { GetLands } from 'src/app/shared/models/real-state/land';
import { SharedServices } from 'src/app/shared/services/shared-services';

@Component({
  selector: 'app-lands',
  imports: [InputTxt, InputDate, InputSelect, Table, Button, NgIf],
  templateUrl: './lands.html',
  styleUrl: './lands.scss'
})
export class Lands {
  pageTitle: string = 'الأراضي'
  cols: any[];
  lands: GetLands;
  pageSize: number = 14;
  totalPages: 2;
  pageNumber:number = 1;

  constructor(private dialog: MatDialog, private router: Router, private RealStateServices: RealStateServices,private SharedServices:SharedServices) {
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'number', header: 'رقم الأرض' },
      { field: 'name', header: 'اسم الأرض' },
      { field: 'location', header: 'الموقع' },
      { field: 'area', header: 'المساحة (م2)' },
      { field: 'buildingsCount', header: 'العمارات' },
      { field: 'unitsCount', header: 'الشقق' },
      { field: 'convertCreationDate', header: 'تاريخ الانشاء' },
      { field: '', header: 'التحكم', control: true }

    ];

    this.getLands()
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
  detailesLand(data: any) {
    this.router.navigate(['/real-state-management/lands/DetailesLand']);
  }
  editLand(data: any) {
    this.router.navigate(['/real-state-management/lands/EditLand']);
  }


  getLands() {
    this.RealStateServices.GetLands(this.pageSize, this.pageNumber).subscribe(res => {
      console.log(res)
      if(res.isSuccess){
        this.lands = res.value
        this.lands.items.forEach(el=>{
          el.location = el.district.ar;
          el.convertCreationDate = this.SharedServices.convertToArabicDate(el.creationDate)
        })
      }
    })
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber
  }


}

