import { ChangeDetectorRef, Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { FormsModule } from '@angular/forms';
import { Button } from "src/app/shared/components/button/button";
import { Table } from "src/app/shared/components/table/table";
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { PaymentsManagementServices } from '../payments-management-services';
import { RealStateServices } from '../../real-state-management/real-state-services';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-incomes',
  imports: [FormsModule, InputTxt, InputSelect, InputNum, InputDate, Button, Table,NgIf],
  templateUrl: './incomes.html',
  styleUrl: './incomes.scss'
})
export class Incomes {
  pageTitle: string = 'المدفوعات الواردة';
  filters = {
    Code: '',
    ContractNumber:'',
    ClientName:'',
    UnitId: '',
    Amount: '',
    PaymentDate: '',
  };
  cols: any[];
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  DropDownUnits: DropDownUnits[];
  Incomes: any;
  constructor(
    private SharedServices: SharedServices,
    private PaymentsManagementServices: PaymentsManagementServices,
    private RealStateServices: RealStateServices,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUnits();
    this.getInComes();
    this.cols = [
      { field: 'code', header: 'رقم العملية' },
      { field: 'code', header: 'اسم العميل' },
      { field: 'expenseTypeName', header: 'نوع العملية' },
      { field: 'unitCode', header: 'رقم الوحدة' },
      { field: 'buildingCode', header: 'رقم العقد' },
      { field: 'amount', header: 'المبلغ' },
      { field: 'convertPaymentDate', header: 'تاريخ الدفع' },
      { field: 'paymentMethodName', header: 'طريقة الدفع' },
      { field: '', header: 'التحكم', controlOutcome: true },
    ];
  }

  getFilter(num: any) {
    this.getInComes();
  }

  getUnits() {
    this.RealStateServices.getDropDownUnits().subscribe((res) => {
      res.isSuccess ? (this.DropDownUnits = res.value) : '';
      this.cd.detectChanges();
    });
  }
  getInComes() {
    this.PaymentsManagementServices.GetIncomes(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      // if (res.isSuccess) {
      //   this.Incomes = res.value;
      //   this.Incomes.items.forEach((el) => {
      //     (el.beneficiaryName = el.beneficiary.ar),
      //       (el.paymentMethodName = el.paymentMethod.ar),
      //       (el.expenseTypeName = el.expenseType.ar),
      //       (el.convertPaymentDate = this.SharedServices.convertToArabicDate(
      //         el.paymentDate
      //       ));
      //   });

      //   this.totalPages = res.value.totalPages;
      //   this.cd.markForCheck();
      // }
    });
  }
  createInCome() {
    this.router.navigate(['/payments-management/incomes/create']);
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getInComes();
  }
  // detailesIncome(Income : OutCome){
  //   this.router.navigate(['/payments-management/incomes/detailes'], {
  //     queryParams: { id: outCome.id },
  //   });
  // }
  // editIncome(Income : OutCome){
  //   this.router.navigate(['/payments-management/incomes/edit']);
  // }
}
