import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { Button } from "src/app/shared/components/button/button";
import { OutComeDetailes } from 'src/app/shared/models/payment/outCome';
import { SharedServices } from 'src/app/shared/services/shared-services';
import { PaymentsManagementServices } from '../../payments-management-services';

@Component({
  selector: 'app-detailes-outcome',
  imports: [Button],
  templateUrl: './detailes-outcome.html',
  styleUrl: './detailes-outcome.scss'
})
export class DetailesOutcome {
  pageTitle: string ='تفاصيل الصرف';
  OutComeDetailes : OutComeDetailes;
  outComeId : string;
  constructor(private SharedServices : SharedServices,private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private PaymentsManagementServices: PaymentsManagementServices, private router: Router) {

  }
  ngOnInit(): void {
    this.outComeId = String(this.activatedRoute.snapshot.queryParamMap.get('id'))
    this.getOutComeDetailes()
  }
  getOutComeDetailes(){
    this.PaymentsManagementServices.GetOutcomeByID(this.outComeId).subscribe(res => {
      if (res.isSuccess) {
        console.log(res)
        this.OutComeDetailes = res.value;
          // (el.beneficiaryName = el.beneficiary.ar),
          //   (el.paymentMethodName = el.paymentMethod.ar),
          //   (el.expenseTypeName = el.expenseType.ar),
          //   (el.convertPaymentDate = this.SharedServices.convertToArabicDate(
          //     el.paymentDate

        this.cd.markForCheck();
      }
    })
  }
  downloadAttachment(code: string) {
    console.log(code)
    // let id = this.landDetailes.attachments.find(a => a.elementId == code)?.attachmentId;
    // console.log(id)
    // this.RealStateServices.DownloadDocmument(String(id)).subscribe(blob => {
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = `${code}`;
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // })
  }

  print() {
    this.SharedServices.printPage()
  }
}
