import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { RealStateServices } from '../../real-state-management/real-state-services';
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { PaymentsManagementServices } from '../payments-management-services';
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-outcomes',
  imports: [InputTxt, FormsModule, InputSelect, InputNum, InputDate, Button],
  templateUrl: './outcomes.html',
  styleUrl: './outcomes.scss'
})
export class Outcomes {
  pageTitle: string = 'المدفوعات الخارجة'
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

  constructor(private PaymentsManagementServices:PaymentsManagementServices,private RealStateServices:RealStateServices,private cd: ChangeDetectorRef, private dialog: MatDialog, private router: Router, ) {
  }

  ngOnInit(): void {
    this.getUnits()
    this.getOutComes();
    this.cols = [
      { field: 'number', header: 'رقم الأرض' },
      { field: 'name', header: 'اسم الأرض' },
      { field: 'location', header: 'الموقع' },
      { field: 'area', header: 'المساحة (م2)' },
      { field: 'buildingsCount', header: 'العمارات' },
      { field: 'unitsCount', header: 'الشقق' },
      { field: 'convertCreationDate', header: 'تاريخ الانشاء' },
      { field: '', header: 'التحكم', control: true },
    ];
  }

  getFilter(num: any) {
    this.getUnits();
  }

  getUnits(){
    this.RealStateServices.getDropDownUnits().subscribe(res=>{
      res.isSuccess ? this.DropDownUnits = res.value : '';
      this.cd.detectChanges();
    })
  }
  getOutComes() {
    this.PaymentsManagementServices.GetOutcomes(this.pageSize, this.pageNumber, this.filters).subscribe(res => {
      console.log(res)
      // if (res.isSuccess) {
      //   this.lands = res.value;
      //   this.lands.items.forEach(el => {
      //     el.location = el.district.ar,
      //       el.convertCreationDate = this.SharedServices.convertToArabicDate(el.creationDate)
      //   })

      //   this.totalPages = res.value.totalPages;
      //   this.cd.markForCheck();
      // }
    })
  }
  createOutCome(){
    this.router.navigate(['/payments-management/outcomes/create']);
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getOutComes();
  }
}
