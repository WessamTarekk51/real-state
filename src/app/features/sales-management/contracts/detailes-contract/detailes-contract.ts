import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesServices } from '../../sales-services';
import { ContractDetailes } from 'src/app/shared/models/contract';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Button } from "src/app/shared/components/button/button";
import { SharedServices } from 'src/app/shared/services/shared-services';
import { Table } from "src/app/shared/components/table/table";

@Component({
  selector: 'app-detailes-contract',
  imports: [NgIf, Button, NgFor, NgClass, Table],
  templateUrl: './detailes-contract.html',
  styleUrl: './detailes-contract.scss'
})
export class DetailesContract {
  pageTitle: string = 'تفاصيل العقد'
  contractId: string;
  contractDetailes: ContractDetailes
  buttons: any[];
  activeTab: number = 1;
  cols: any[];

  constructor(private SharedServices:SharedServices,private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private SalesServices: SalesServices, private router: Router,private RealStateServices:RealStateServices) {
    //
  }
  ngOnInit(): void {
    this.buttons = [
      {
        name: 'بيانات العميل',
        type: 1,
        active: true,
      },
      {
        name: 'بيانات الوحدة',
        type: 2,
        active: false,
      },
      {
        name: 'جدول الأقساط',
        type: 3,
        active: false,
      },
      // {
      //   name: 'جدول الأقساط',
      //   type: 4,
      //   active: false,
      // }
    ];
    this.contractId = String(this.activatedRoute.snapshot.queryParamMap.get('id'))
    this.getContractDetailes();
    this.cols = [
      { field: 'description', header: 'تفاصيل  القسط' },
      { field: 'dueDate', header: 'تاريخ  الاستحقاق ' },
      { field: 'amount', header: ' قيمة القسط بالأرقام' },
      { field: 'amountText', header: ' قيمة القسط بالحروف' },
    ];
  }
  getContractDetailes() {
    this.SalesServices.GetContractsByID(this.contractId).subscribe(res => {
      if (res.isSuccess) {
        this.contractDetailes = res.value
        console.log(this.contractDetailes)
        this.cd.markForCheck();
      }
    })
  }
  downloadAttachment(code: string) {
    console.log(code)
    let id = this.contractDetailes.attachments.find(a => a.elementId == code)?.attachmentId;
    console.log(id)
    this.RealStateServices.DownloadDocmument(String(id)).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${code}`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }
  edit() {
    this.router.navigate(['/sales-management/contracts/edit'], {
      queryParams: { id: this.contractId },
    });
  }
  print() {
    this.SharedServices.printPage()
  }
  toggleButton(button: any) {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    button.active = true;
    this.activeTab = button.type;
  }
}
