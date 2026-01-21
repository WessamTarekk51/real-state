import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementWorkerServices } from '../../management-worker-services';
import { WorkerDetailes } from 'src/app/shared/models/customer/employess';
import { NgIf } from '@angular/common';
import { Button } from "src/app/shared/components/button/button";
import { SharedServices } from 'src/app/shared/services/shared-services';

@Component({
  selector: 'app-detailes-worker',
  imports: [NgIf, Button],
  templateUrl: './detailes-worker.html',
  styleUrl: './detailes-worker.scss'
})
export class DetailesWorker {
  pageTitle: string = 'تفاصيل الارض'
  workerId: string;
  workerDetailes: WorkerDetailes
  constructor(public SharedServices: SharedServices, private ManagementWorkerServices: ManagementWorkerServices, private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.workerId = String(this.activatedRoute.snapshot.queryParamMap.get('id'))
    this.getWorkerDetailes()
  }
  getWorkerDetailes() {
    this.ManagementWorkerServices.GetWorkerByID(this.workerId).subscribe(res => {
      console.log(res)
      if (res.isSuccess) {
        this.workerDetailes = res.value
        console.log(this.workerDetailes)
        this.cd.markForCheck();
      }
    })
  }
  editWorker(){

  }
}
