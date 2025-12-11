import { ChangeDetectorRef, Component } from '@angular/core';
import { InputTxt } from 'src/app/shared/components/input-txt/input-txt';
import { InputSelect } from 'src/app/shared/components/input-select/input-select';
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { Button } from 'src/app/shared/components/button/button';
import { Router } from '@angular/router';
import { Table } from 'src/app/shared/components/table/table';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { RealStateServices } from '../real-state-services';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { GetUnits, Unit } from 'src/app/shared/models/real-state/unit';
import { FormsModule } from '@angular/forms';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';

@Component({
  selector: 'app-units',
  imports: [InputTxt, InputSelect, InputNum, Button, Table, NgIf, FormsModule],
  templateUrl: './units.html',
  styleUrl: './units.scss',
})
export class Units {
  pageTitle: string = 'الوحدات السكنية';
  cols: any[];
  units: GetUnits;
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  filters = {
    Number: '',
    BuildingId: '',
    LandId: '',
    StatusId: '',
    FloorNumber: '',
    NumberOfRooms: '',
    Price: '',
    Area: '',
  };
  dialogRef: any;

  DropDownLands: DropDownLands[];
  DropDownBuildings: DropDownBuildings[];
  UnitStatus: LookUpItem[];

  constructor(
    private cd: ChangeDetectorRef,
    private SharedServices: SharedServices,
    private dialog: MatDialog,
    private router: Router,
    private RealStateServices: RealStateServices
  ) {}

  ngOnInit(): void {
    this.getDataSelect();
    this.cols = [
      { field: 'number', header: 'رقم الوحدة' },
      { field: 'name', header: 'اسم الوحدة' },
      { field: 'building', header: 'العمارة' },
      { field: 'land', header: 'الأرض التابعة' },
      { field: 'floorNumber', header: 'الدور' },
      { field: 'area', header: 'المساحة (م2)' },
      { field: 'numberOfRooms', header: 'الغرف' },
      { field: 'numberOfBatEmployeeooms', header: 'الحمامات' },
      { field: 'price', header: 'السعر' },

      { field: 'unitStatusName', header: 'الحالة', status: true },
      { field: '', header: 'التحكم', control: true, unit: true },
    ];
    this.getUnits();
  }
  getDataSelect() {
    this.getDropDownLands();
    this.getDropDownBuildings();
    this.getUnitStatus()
  }
  getFilter(num: any) {
    console.log(this.filters);
    this.getUnits();
  }
  getUnits() {
    this.RealStateServices.GetUnits(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      if (res.isSuccess) {
        this.units = res.value;
        console.log(this.units);
        this.units.items.forEach((el) => {
          el.unitStatusName = el.status.ar;
        });
        this.totalPages = res.value.totalPages;
        this.cd.markForCheck();
      }
    });
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getUnits();
  }

  getDropDownLands() {
    this.RealStateServices.getDropDownLands().subscribe((res) => {
      res.isSuccess ? (this.DropDownLands = res.value) : '';
    });
    this.cd.detectChanges();
  }
  getDropDownBuildings() {
    this.RealStateServices.getDropDownBuildings().subscribe((res) => {
      res.isSuccess ? (this.DropDownBuildings = res.value) : '';
    });
    this.cd.detectChanges();
  }
  getUnitStatus() {
    this.RealStateServices.GetLookUpSetByCode('unit_status').subscribe(
      (res) => {
        if (res.isSuccess) {
          this.UnitStatus = res.value.items;
          this.UnitStatus.forEach(el=>{
            el.name = el.descriptions.ar
          })
        }
      }
    );
  }

  createUnit() {
    this.router.navigate(['/real-state-management/units/createUnit']);
  }
  detailesUnit(unit: Unit) {
    this.router.navigate(['/real-state-management/units/detailesUnit'], {
      queryParams: { id: unit.id },
    });
  }
  editUnit(unit: Unit) {
    this.router.navigate(['/real-state-management/units/createUnit'], {
      queryParams: { id: unit.id },
    });
  }

}
