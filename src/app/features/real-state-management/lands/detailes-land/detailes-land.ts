import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from "src/app/shared/components/button/button";
import { RealStateServices } from '../../real-state-services';
import { LandDetailes } from 'src/app/shared/models/real-state/land';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-detailes-land',
  imports: [Button, NgIf],
  templateUrl: './detailes-land.html',
  styleUrl: './detailes-land.scss'
})
export class DetailesLand {
  pageTitle: string = 'تفاصيل الارض'
  landId: string;
  landDetailes: LandDetailes

  constructor(private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private RealStateServices: RealStateServices, private router: Router) {
    //
  }
  ngOnInit(): void {
    this.landId = String(this.activatedRoute.snapshot.queryParamMap.get('id'))
    this.getLandDetailes()

  }
  getLandDetailes() {
    this.RealStateServices.GetLandsByID(this.landId).subscribe(res => {
      if (res.isSuccess) {
        this.landDetailes = res.value
        console.log(this.landDetailes)
        this.cd.markForCheck();
      }
    })
  }
  downloadAttachment(code: string) {
    console.log(code)
    let id = this.landDetailes.attachments.find(a => a.elementId == code)?.attachmentId;
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
}
