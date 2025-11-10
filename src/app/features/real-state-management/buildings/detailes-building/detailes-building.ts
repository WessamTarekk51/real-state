import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from "src/app/shared/components/button/button";
import { Table } from "src/app/shared/components/table/table";

@Component({
  selector: 'app-detailes-building',
  imports: [Button, NgClass, NgFor, Table,NgIf],
  templateUrl: './detailes-building.html',
  styleUrl: './detailes-building.scss'
})
export class DetailesBuilding {
  pageTitle: string = 'تفاصيل العمارة'
  buttons: any[];
  activeTab: number = 1;
  cols: any[];
  buildings: any[];
  constructor(private router:Router){}
  ngOnInit(): void {
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
}
