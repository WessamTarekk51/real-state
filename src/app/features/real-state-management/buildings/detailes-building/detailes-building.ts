import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'src/app/shared/components/button/button';
import { Table } from 'src/app/shared/components/table/table';
import { RealStateServices } from '../../real-state-services';
import { BuildingDetailes } from 'src/app/shared/models/real-state/building';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { GetUnits, Unit } from 'src/app/shared/models/real-state/unit';

@Component({
  selector: 'app-detailes-building',
  imports: [Button, NgClass, NgFor, Table, NgIf],
  templateUrl: './detailes-building.html',
  styleUrl: './detailes-building.scss',
})
export class DetailesBuilding {
  pageTitle: string = 'تفاصيل العمارة';
  buttons: any[];
  activeTab: number = 1;
  cols: any[];
  buildings: any[];

  buildingId: string;
  buildingDetailes: BuildingDetailes;
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

  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  units: GetUnits;
  constructor(
    public SharedServices: SharedServices,
    private cd: ChangeDetectorRef,
    private router: Router,
    private RealStateServices: RealStateServices,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.buildingId = String(
      this.activatedRoute.snapshot.queryParamMap.get('id')
    );
    this.filters.BuildingId = this.buildingId;
    this.getBuildingDetailes();
    this.getUnitsByBuildingID()
    this.buttons = [
      {
        name: 'البيانات الاساسية',
        type: 1,
        active: true,
      },
      {
        name: 'الوحدات السكنية',
        type: 2,
        active: false,
      },
    ];
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

  }
  toggleButton(button: any) {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    button.active = true;
    this.activeTab = button.type;
  }
  editUnit(data: any) {
    // this.router.navigate(['/real-state-management/un/EditBuilding']);
  }

  getBuildingDetailes() {
    this.RealStateServices.GetBuildingsByID(this.buildingId).subscribe(
      (res) => {
        if (res.isSuccess) {
          this.buildingDetailes = res.value;
          this.cd.markForCheck();
        }
      }
    );
  }
  downloadAttachment(code: string) {
    console.log(code);
    let id = this.buildingDetailes.attachments.find(
      (a) => a.elementId == code
    )?.attachmentId;
    this.RealStateServices.DownloadDocmument(String(id)).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${code}`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  getUnitsByBuildingID() {
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
  detailesUnit(unit: Unit) {
    this.router.navigate(['/real-state-management/units/detailesUnit'], {
      queryParams: { id: unit.id },
    });
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getUnitsByBuildingID();
  }
}
