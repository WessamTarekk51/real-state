import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { SalesServices } from '../sales-services';
import { GetContracts } from 'src/app/shared/models/contract';
import { Button } from 'src/app/shared/components/button/button';
import { Table } from 'src/app/shared/components/table/table';
import { NgIf } from '@angular/common';
import { InputTxt } from 'src/app/shared/components/input-txt/input-txt';
import { FormsModule } from '@angular/forms';
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { InputDate } from 'src/app/shared/components/input-date/input-date';

@Component({
  selector: 'app-contracts',
  imports: [FormsModule, InputTxt, NgIf, InputNum, InputDate, Button, Table],
  templateUrl: './contracts.html',
  styleUrl: './contracts.scss',
})
export class Contracts {
  pageTitle: string = 'جدول عقود البيع';
  cols: any[];
  contracts: GetContracts;
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  filters = {
    ContractNumber: '',
    ClientName: '',
    UnitNumber: '',
    TotalPrice: '',
    UnitPriceAtContract: '',
    ContractTypeId: '',
    ContractDate: '',
    IsInstallmentPlan: '',
  };
  dialogRef: any;
  constructor(
    private cd: ChangeDetectorRef,
    private SharedServices: SharedServices,
    private dialog: MatDialog,
    private router: Router,
    private SalesServices: SalesServices
  ) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'contractNumber', header: 'رقم العقد' },
      { field: 'clientName', header: 'العميل' },
      { field: 'landName', header: 'رقم الوحدة' },
      { field: 'totalPrice', header: 'قيمة العقد' },
      { field: 'notes', header: 'المقدم' },
      { field: 'unitPriceAtContract', header: 'الباقي' },
      { field: 'convertConstructionYear', header: 'تاريخ بداية الدفع' },
      { field: '', header: 'التحكم', controlContract: true },
    ];
    this.getContract();
  }
  getFilter(num: any) {
    this.getContract();
  }
  getContract() {
    this.SalesServices.GetContracts(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      console.log(res);
      if (res.isSuccess) {
        this.contracts = res.value;
        this.contracts.items.forEach((el) => {
          el.convertcontractDate = this.SharedServices.convertToArabicDate(
            el.contractDate
          );
        });
        this.totalPages = res.value.totalPages;
        this.cd.markForCheck();
      }
    });
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getContract();
  }

  detailes(item: any) {
    this.router.navigate(['/sales-management/contracts/detailes'], {
      queryParams: { id: item.id },
    });
  }
  edit(item: any) {
    console.log(item);
  }
  create(){
    this.router.navigate(['/sales-management/contracts/create']);
  }
}
