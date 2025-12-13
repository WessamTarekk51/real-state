import { ChangeDetectorRef, Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { RealStateServices } from '../../real-state-management/real-state-services';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { FormsModule } from '@angular/forms';
import { Button } from "src/app/shared/components/button/button";
import { Router } from '@angular/router';
import { CustomerManagementServices } from '../customer-management-services';
import { Client, GetClients } from 'src/app/shared/models/customer/client';
import { Table } from "src/app/shared/components/table/table";
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClient } from './delete-client/delete-client';

@Component({
  selector: 'app-clients',
  imports: [InputTxt, InputSelect, InputNum, FormsModule, Button, Table,NgIf],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients {
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  DropDownLands: DropDownLands[];
  DropDownBuildings: DropDownBuildings[];
  clients:GetClients
  filters = {
    NumberOfUnit: '',
    BuildingName: '',
    LandName: '',
    NumberOfFloor: '',
  };
  cols: any[];
  dialogRef: any

  constructor(private dialog: MatDialog,private router: Router,private cd: ChangeDetectorRef,private RealStateServices: RealStateServices,private CustomerManagementServices:CustomerManagementServices  ){
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDataSelect();
    this.getClients();
    this.cols = [
      { field: 'code', header: 'رقم العميل'},
      { field: 'name', header: 'اسم العميل بالكامل' },
      { field: 'phone', header: 'رقم الهاتف' },
      { field: 'email', header: 'البريد الإلكتروني' },
      { field: 'nationalId', header: 'الرقم القومي' },
      { field: 'address', header:'عنوان السكن' },
      { field: '', header: 'التحكم', control: true },
    ];

  }
  getDataSelect() {
    this.getDropDownLands();
    this.getDropDownBuildings();
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
  getFilter(num: any) {
    console.log(this.filters);
    this.getClients();
  }
  getClients(){
    this.CustomerManagementServices.GetClient(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      console.log(res)
      if (res.isSuccess) {
        this.clients = res.value;
        this.totalPages = res.value.totalPages;
        this.cd.markForCheck();
      }
    });
  }
  createClient(){
    this.router.navigate(['/customer-management/clients/create']);
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getClients();
  }
  detailesClient(client: Client) {
    this.router.navigate(['/customer-management/clients/detailes'], {
      queryParams: { id: client.id },
    });
  }
  editClient(client: Client) {
    this.router.navigate(['/customer-management/clients/create'], {
      queryParams: { id: client.id },
    });
  }
  deleteClient(client: Client){
    this.dialogRef = this.dialog.open(DeleteClient, {
      data: { ...client },
      panelClass: 'center-dialog'
    });
    this.dialogRef.componentInstance.cancleEvent.subscribe(() => {
      this.dialogRef.close();
    });
    this.dialogRef.componentInstance.deleteEvent.subscribe((client: Client) => {
      this.delete(client)
    });
  }
  delete(client: Client) {
    this.CustomerManagementServices.DeleteClient(client.id).subscribe(res => {
      res.isSuccess ? [this.dialogRef.close(), this.getClients()] : ''
    })
  }
}
