import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { Button } from "src/app/shared/components/button/button";
import { SharedServices } from 'src/app/shared/services/shared-services';

@Component({
  selector: 'app-detailes-outcome',
  imports: [Button],
  templateUrl: './detailes-outcome.html',
  styleUrl: './detailes-outcome.scss'
})
export class DetailesOutcome {
  pageTitle: string ='تفاصيل الصرف';

  constructor(private SharedServices : SharedServices,private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private RealStateServices: RealStateServices, private router: Router) {
    //
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
