import { ChangeDetectorRef, Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { Button } from "src/app/shared/components/button/button";
import { Router } from '@angular/router';
import { Table } from "src/app/shared/components/table/table";
import { Building, GetBuildings } from 'src/app/shared/models/real-state/building';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { RealStateServices } from '../real-state-services';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUnit } from './delete-unit/delete-unit';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-units',
  imports: [InputTxt, InputSelect, InputNum, Button, Table,NgIf],
  templateUrl: './units.html',
  styleUrl: './units.scss'
})
export class Units {
  pageTitle: string = 'الوحدات السكنية'
  cols: any[];
  units: GetBuildings;
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  filters = {
    Number: '',
    Name: '',
    LandId: '',
    StatusId: '',
    ConstructionDate: '',
    Area: '',
    FloorCount: '',
    UnitCount: ''
  };
  dialogRef: any;

  DropDownLands: DropDownLands[];
  constructor(private cd: ChangeDetectorRef, private SharedServices: SharedServices, private dialog: MatDialog, private router: Router, private RealStateServices: RealStateServices) { }

  ngOnInit(): void {
    this.getDropDownLands()
    this.cols = [
      { field: 'number', header: 'رقم العمارة' },
      { field: 'name', header: 'اسم العمارة' },
      { field: 'landName', header: 'الأرض التابعة' },
      { field: 'numberOfFloors', header: 'عدد الأدوار' },
      { field: 'numberOfUnits', header: 'عدد الشقق' },
      { field: 'area', header: 'المساحة (م2)' },
      { field: 'convertConstructionYear', header: 'سنة البناء' },
      { field: 'convertCreationDate', header: 'تاريخ الانشاء' },
      { field: '', header: 'الحالة', status: true },
      { field: '', header: 'التحكم', control: true }
    ];
    this.getBuilding()
  }
  getFilter(num: any) {
    this.getBuilding()
  }
  getBuilding() {
    this.RealStateServices.GetBuildings(this.pageSize, this.pageNumber, this.filters).subscribe(res => {
      if (res.isSuccess) {
        this.units = res.value;
        this.units.items.forEach(el => {
          el.convertCreationDate = this.SharedServices.convertToArabicDate(el.creationDate);
          el.convertConstructionYear = this.SharedServices.convertToArabicDate(el.constructionYear)
          el.buildingStatusName = el.buildingStatus.ar
        })
        this.totalPages = res.value.totalPages;
        this.cd.markForCheck();
      }
    })
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getBuilding();
  }


  getDropDownLands() {
    this.RealStateServices.getDropDownLands().subscribe(res => {
      res.isSuccess ? this.DropDownLands = res.value : '';
    })
    this.cd.detectChanges();
  }


  deleteBuiling(building: Building) {
    this.dialogRef = this.dialog.open(DeleteUnit, {
      data: { ...building },
      panelClass: 'center-dialog'
    });
    this.dialogRef.componentInstance.cancleEvent.subscribe(() => {
      this.dialogRef.close();
    });
    this.dialogRef.componentInstance.deleteEvent.subscribe((building: Building) => {
      this.delete(building)
    });

  }
  createUnit() {
    this.router.navigate(['/real-state-management/units/createUnit']);
  }
  detailesBuiling(building: Building) {
    this.router.navigate(['/real-state-management/builings/detailesBuilding'], {
      queryParams: { id: building.id }
    });
  }
  editBuiling(building: Building) {
    this.router.navigate(['/real-state-management/builings/editBuilding'], {
      queryParams: { id: building.id }
    });
  }
  delete(building: Building) {
    this.RealStateServices.DeleteBuildings(building.id).subscribe(res => {
      console.log(res)
      res.isSuccess ? [this.dialogRef.close(), this.getBuilding()] : ''
    })
  }
}
