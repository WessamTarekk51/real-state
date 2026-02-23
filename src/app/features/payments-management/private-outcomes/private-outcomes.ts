import { ChangeDetectorRef, Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { FormsModule } from '@angular/forms';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { PaymentsManagementServices } from '../payments-management-services';
import { RealStateServices } from '../../real-state-management/real-state-services';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Button } from "src/app/shared/components/button/button";
import { Table } from "src/app/shared/components/table/table";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-private-outcomes',
  imports: [NgIf,InputTxt, InputSelect, InputNum, InputDate, FormsModule, Button, Table],
  templateUrl: './private-outcomes.html',
  styleUrl: './private-outcomes.scss'
})
export class PrivateOutcomes {
  pageTitle: string = 'المدفوعات الخاصة';
  filters = {
    Code: '',
    ClientName:'',
    UnitId: '',
    Amount: '',
    type:'',
    PaymentDate: '',
  };
  cols: any[];
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  DropDownUnits: DropDownUnits[];
  privates: any;
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
    this.getPrivates();
    this.cols = [
      { field: 'code', header: 'رقم العملية' },
      { field: 'code', header: "الجهة/ الشخص" },
      { field: 'expenseTypeName', header: 'نوع الصرف' },
      { field: 'unitCode', header: 'رقم الوحدة' },
      { field: 'buildingCode', header: 'رقم العمارة' },
      { field: 'amount', header: 'المبلغ' },
      { field: 'convertPaymentDate', header: 'تاريخ الدفع' },
      { field: 'paymentMethodName', header: 'طريقة الدفع' },
      { field: '', header: 'التحكم', controlOutcome: true },
    ];
  }

  getFilter(num: any) {
    this.getPrivates();
  }

  getUnits() {
    this.RealStateServices.getDropDownUnits().subscribe((res) => {
      res.isSuccess ? (this.DropDownUnits = res.value) : '';
      this.cd.detectChanges();
    });
  }
  getPrivates() {
    this.PaymentsManagementServices.GetPrivates(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      // if (res.isSuccess) {
      //   this.privates = res.value;
      //   this.privates.items.forEach((el) => {
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
  createPrivate() {
    this.router.navigate(['/payments-management/privateOutcomes/create']);
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getPrivates();
  }
  // detailesPrivate(Private : OutCome){
  //   this.router.navigate(['/payments-management/privateOutcomes/detailes'], {
  //     queryParams: { id: outCome.id },
  //   });
  // }
  // editPrivate(Private : OutCome){
  //   this.router.navigate(['/payments-management/privateOutcomes/edit']);
  // }
}
