import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from "src/app/shared/components/button/button";
import { Table } from "src/app/shared/components/table/table";
import { RealStateServices } from '../../real-state-services';
import { BuildingDetailes } from 'src/app/shared/models/real-state/building';
import { SharedServices } from 'src/app/shared/services/shared-services';

@Component({
  selector: 'app-detailes-building',
  imports: [Button, NgClass, NgFor, Table, NgIf],
  templateUrl: './detailes-building.html',
  styleUrl: './detailes-building.scss'
})
export class DetailesBuilding {
  pageTitle: string = 'تفاصيل العمارة'
  buttons: any[];
  activeTab: number = 1;
  cols: any[];
  buildings: any[];

  buildingId: string;
  buildingDetailes: BuildingDetailes;

  constructor(public SharedServices:SharedServices,private cd: ChangeDetectorRef,private router: Router, private RealStateServices: RealStateServices, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.buildingId = String(this.activatedRoute.snapshot.queryParamMap.get('id'))
    this.getBuildingDetailes()
    this.buttons = [
      {
        name: "البيانات الاساسية",
        type: 1,
        active: true
      },
      {
        name: "الوحدات السكنية",
        type: 2,
        active: false
      }
    ]
    this.cols = [
      { field: 'code', header: 'رقم العمارة' },
      { field: 'name', header: 'اسم العمارة' },
      { field: 'category', header: 'الأرض التابعة' },
      { field: 'quantity', header: 'عدد الأدوار' },
      { field: 'quantity', header: 'عدد الشقق' },
      { field: 'quantity', header: 'المساحة (م2)' },
      { field: 'quantity', header: 'سنة البناء' },
      { field: 'quantity', header: 'تاريخ الانشاء' },
      { field: '', header: 'الحالة', status: true },
      { field: '', header: 'التحكم', control: true }
    ];
    this.buildings = [
      {
        id: '1000',
        code: 'f23cv0fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        status: 2,
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        status: 1

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        status: 2

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        status: 1

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        status: 1

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        status: 1

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        status: 1

      }
    ]
  }
  toggleButton(button: any) {
    this.buttons.forEach(el => {
      el.active = false
    })
    button.active = true;
    this.activeTab = button.type
  }
  detailesUnit(data: any) {
  }
  editUnit(data: any) {
    this.router.navigate(['/real-state-management/builings/EditBuilding']);
  }


  getBuildingDetailes() {
    this.RealStateServices.GetBuildingsByID(this.buildingId).subscribe(res => {
      if (res.isSuccess) {
        this.buildingDetailes = res.value
        this.cd.markForCheck();
      }
    })
  }
 downloadAttachment(code: string) {
    console.log(code)
    let id = this.buildingDetailes.attachments.find(a => a.elementId == code)?.attachmentId;
    this.RealStateServices.DownloadDocmument(String(id)).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${code}`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }
}
