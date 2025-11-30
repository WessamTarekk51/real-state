import { ChangeDetectorRef, Component } from '@angular/core';
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
import { GetLands, Land } from 'src/app/shared/models/real-state/land';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { FormsModule } from "@angular/forms";
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-lands',
  imports: [InputTxt, InputDate, InputSelect, Table, Button, NgIf, FormsModule],
  templateUrl: './lands.html',
  styleUrl: './lands.scss'
})
export class Lands {
  pageTitle: string = 'الأراضي'
  cols: any[];
  lands: GetLands;
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  filters = {
    Number: '',
    Name: '',
    DistrictId: '',
    ConstructionDate: '',
    Area: '',
    BuildingCount: ''
  };
  Districtes: LookUpItem[];
  dialogRef: any
  constructor(private cd: ChangeDetectorRef, private dialog: MatDialog, private router: Router, private RealStateServices: RealStateServices, private SharedServices: SharedServices) {
  }

  ngOnInit(): void {
    this.getDistrict()
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
  getFilter(num: any) {
    this.getLands()
  }
  getLands() {
    this.RealStateServices.GetLands(this.pageSize, this.pageNumber, this.filters).subscribe(res => {
      if (res.isSuccess) {
        this.lands = res.value;
        this.lands.items.forEach(el => {
          el.location = el.district.ar,
            el.convertCreationDate = this.SharedServices.convertToArabicDate(el.creationDate)
        })

        this.totalPages = res.value.totalPages;
        this.cd.markForCheck();
      }
    })
  }
 GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getLands();
  }

  getDistrict() {
    this.RealStateServices.GetLookUpSetByCode('district').subscribe(res => {
      if (res.isSuccess) {
        this.Districtes = res.value.items;
        this.Districtes.forEach(el => {
          el.name = el.descriptions.ar
        })
      }
      this.cd.detectChanges();
    });

  }
  deleteLand(land: Land) {
    this.dialogRef = this.dialog.open(DeleteLand, {
      data: { ...land },
      panelClass: 'center-dialog'
    });
    this.dialogRef.componentInstance.cancleEvent.subscribe(() => {
      this.dialogRef.close();
    });
    this.dialogRef.componentInstance.deleteEvent.subscribe((land: Land) => {
      this.delete(land)
    });

  }
  createLand() {
    this.router.navigate(['/real-state-management/lands/CreateLand']);
  }
  detailesLand(data: Land) {
    this.router.navigate(['/real-state-management/lands/detailesLand'], {
      queryParams: { id: data.id }
    });
  }
  editLand(data: Land) {
    this.router.navigate(['/real-state-management/lands/EditLand'], {
      queryParams: { id: data.id }
    });
  }
  delete(land: Land) {
    this.RealStateServices.DeleteLands(land.id).subscribe(res => {
      console.log(res)
      res.isSuccess ? [this.dialogRef.close(), this.getLands()] : ''
    })
  }

}

