import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { Button } from "src/app/shared/components/button/button";
import { Table } from "src/app/shared/components/table/table";
import { DeleteBuilding } from './delete-building/delete-building';
import { NgIf } from '@angular/common';
import { RealStateServices } from '../real-state-services';

@Component({
  selector: 'app-buildings',
  imports: [InputTxt, InputSelect, InputDate, Button, Table, NgIf],
  templateUrl: './buildings.html',
  styleUrl: './buildings.scss'
})
export class Buildings {
  pageTitle: string = 'العمارات'
  cols: any[];
  buildings: any[];

  constructor(private dialog: MatDialog, private router: Router, private RealStateServices:RealStateServices) {

  }
  ngOnInit(): void {
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
    this.getBuilding()
  }

  getBuilding(){
    this.RealStateServices.GetBuildings().subscribe(res=>{
        console.log(res)
    })
  }

  deleteBuiling(data: any) {
    const dialogRef = this.dialog.open(DeleteBuilding, {
      data: { ...data },
      panelClass: 'center-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("close")
      }
    });
  }

  createBuiling() {
    this.router.navigate(['/real-state-management/builings/CreateBuilding']);
  }
  detailesBuiling(data: any) {
    this.router.navigate(['/real-state-management/builings/DetailesBuilding']);
  }
  editBuiling(data: any) {
    this.router.navigate(['/real-state-management/builings/EditBuilding']);
  }
}
