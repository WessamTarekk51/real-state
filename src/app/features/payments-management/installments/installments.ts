import { ChangeDetectorRef, Component } from '@angular/core';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { PaymentsManagementServices } from '../payments-management-services';
import { RealStateServices } from '../../real-state-management/real-state-services';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { FormsModule } from '@angular/forms';
import { Button } from "src/app/shared/components/button/button";
import { Table } from "src/app/shared/components/table/table";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-installments',
  imports: [NgIf,InputTxt, InputSelect, InputNum, InputDate, FormsModule, Button, Table],
  templateUrl: './installments.html',
  styleUrl: './installments.scss'
})
export class Installments {
  pageTitle: string = 'المدفوعات الخارجة';
  filters = {
    ContractNumber:'',
    ClientName:'',
    UnitId: '',
    mokadam: '',
    Amount: '',
    PaymentDate: '',
  };
  cols: any[];
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  DropDownUnits: DropDownUnits[];
  Installments: any;
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
    this.getInstallments();
    this.cols = [
      { field: 'code', header: 'رقم القسط' },
      { field: 'code', header: 'رقم العقد' },
      { field: 'code', header: 'اسم العميل' },
      { field: 'expenseTypeName', header: 'نوع العملية' },
      { field: 'unitCode', header: 'رقم الوحدة' },
      { field: 'amount', header: 'المبلغ' },
      { field: 'convertPaymentDate', header: 'تاريخ الاستحقاق' },
      { field: 'convertPaymentDate', header: 'حالة الدفع' },
      { field: 'convertPaymentDate', header: 'تاريخ الدفع' },
      { field: '', header: 'التحكم', controlOutcome: true },
    ];
  }
  getFilter(num: any) {
    this.getInstallments();
  }

  getUnits() {
    this.RealStateServices.getDropDownUnits().subscribe((res) => {
      res.isSuccess ? (this.DropDownUnits = res.value) : '';
      this.cd.detectChanges();
    });
  }
  getInstallments() {
    this.PaymentsManagementServices.GetInstallments(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      // if (res.isSuccess) {
      //   this.Installments = res.value;
      //   this.Installments.items.forEach((el) => {
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

  createInstallment() {
    this.router.navigate(['/payments-management/installments/create']);
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getInstallments();
  }
  // detailesInstallment(Installment : OutCome){
  //   this.router.navigate(['/payments-management/installments/detailes'], {
  //     queryParams: { id: outCome.id },
  //   });
  // }
  // editInstallment(Installment : OutCome){
  //   this.router.navigate(['/payments-management/installments/edit']);
  // }
}
