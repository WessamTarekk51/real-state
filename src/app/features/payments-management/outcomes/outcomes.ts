import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputTxt } from 'src/app/shared/components/input-txt/input-txt';
import { InputSelect } from 'src/app/shared/components/input-select/input-select';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { RealStateServices } from '../../real-state-management/real-state-services';
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { InputDate } from 'src/app/shared/components/input-date/input-date';
import { PaymentsManagementServices } from '../payments-management-services';
import { Button } from 'src/app/shared/components/button/button';
import { GetOutComes, OutCome } from 'src/app/shared/models/payment/outCome';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { Table } from 'src/app/shared/components/table/table';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-outcomes',
  imports: [
    NgIf,
    InputTxt,
    FormsModule,
    InputSelect,
    InputNum,
    InputDate,
    Button,
    Table,
  ],
  templateUrl: './outcomes.html',
  styleUrl: './outcomes.scss',
})
export class Outcomes {
  pageTitle: string = 'المدفوعات الخارجة';
  filters = {
    Code: '',
    UnitId: '',
    Amount: '',
    PaymentDate: '',
  };
  cols: any[];
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  DropDownUnits: DropDownUnits[];
  Outcomes: GetOutComes;
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
    this.getOutComes();
    this.cols = [
      { field: 'code', header: 'رقم العملية' },
      { field: 'beneficiaryName', header: 'الجهة/الشخص' },
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
    this.getOutComes();
  }

  getUnits() {
    this.RealStateServices.getDropDownUnits().subscribe((res) => {
      res.isSuccess ? (this.DropDownUnits = res.value) : '';
      this.cd.detectChanges();
    });
  }
  getOutComes() {
    this.PaymentsManagementServices.GetOutcomes(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      if (res.isSuccess) {
        this.Outcomes = res.value;
        this.Outcomes.items.forEach((el) => {
          (el.beneficiaryName = el.beneficiary.ar),
            (el.paymentMethodName = el.paymentMethod.ar),
            (el.expenseTypeName = el.expenseType.ar),
            (el.convertPaymentDate = this.SharedServices.convertToArabicDate(
              el.paymentDate
            ));
        });

        this.totalPages = res.value.totalPages;
        this.cd.markForCheck();
      }
    });
  }
  createOutCome() {
    this.router.navigate(['/payments-management/outcomes/create']);
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getOutComes();
  }
  detailesOutcome(outCome : OutCome){
    this.router.navigate(['/payments-management/outcomes/detailes'], {
      queryParams: { id: outCome.id },
    });
  }
  editOutcome(outCome : OutCome){
    this.router.navigate(['/payments-management/outcomes/create']);
  }
}
