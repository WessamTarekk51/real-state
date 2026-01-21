import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ManagementWorkerServices } from '../management-worker-services';
import { Employee, GetEmployees } from 'src/app/shared/models/customer/employess';
import { RealStateServices } from '../../real-state-management/real-state-services';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { FormsModule } from '@angular/forms';
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { SharedServices } from 'src/app/shared/services/shared-services';
import { Button } from "src/app/shared/components/button/button";
import { Router } from '@angular/router';
import { Table } from "src/app/shared/components/table/table";
import { DeleteWorker } from './delete-worker/delete-worker';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-workers',
  imports: [InputTxt, FormsModule, InputNum, InputSelect, InputDate, Button, Table,NgIf],
  templateUrl: './workers.html',
  styleUrl: './workers.scss'
})
export class Workers {
  pageTitle: string = 'العمال والفنيين'
  cols: any[];
  workers: GetEmployees;
  pageSize: number = 4;
  totalPages: number;
  pageNumber: number = 1;
  filters = {
    Phone: '',
    Code: '',
    CreatedDate: '',
    JobStatusId: '',
  };
  Jobs = signal<LookUpItem[]>([]);
  dialogRef: any;
  constructor(private dialog: MatDialog, private router: Router, private SharedServices: SharedServices, private RealStateServices: RealStateServices, private ManagementWorkerServices: ManagementWorkerServices, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getJobs()
    this.cols = [
      { field: 'code', header: 'كود العامل' },
      { field: 'name', header: 'اسم العامل' },
      { field: 'phone', header: 'رقم الهاتف' },
      { field: 'jobStatusName', header: 'الوظيفة' },
      { field: 'convertCreationDate', header: 'تاريخ الانشاء' },
      { field: '', header: 'التحكم', control: true }
    ];
    this.getWorkers();
  }
  getFilter(num: any) {
    this.getWorkers()
  }
  GetpageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getWorkers();
  }
  getWorkers() {
    this.ManagementWorkerServices.GetWorkers(
      this.pageSize,
      this.pageNumber,
      this.filters
    ).subscribe((res) => {
      if (res.isSuccess) {
        this.workers = res.value;
        this.workers.items.forEach(el => {
          el.convertCreationDate = this.SharedServices.convertToArabicDate(el.createdDate);
          el.jobStatusName = el.jobStatus.ar
        })
        this.totalPages = res.value.totalPages;
        this.cd.markForCheck();
      }
    });
  }
  getJobs() {
    this.RealStateServices.GetLookUpSetByCode('jobs').subscribe(res => {
      const mapped = res.value.items.map((el) => ({
        ...el,
        name: el.descriptions.ar,
      }));
      this.Jobs.set(mapped);
      this.cd.markForCheck()
    })


  }
  createWorker() {
    this.router.navigate(['/worker-management/workers/create']);
  }
  deleteWorker(employee: Employee) {
    this.dialogRef = this.dialog.open(DeleteWorker, {
      data: { ...employee },
      panelClass: 'center-dialog'
    });
    this.dialogRef.componentInstance.cancleEvent.subscribe(() => {
      this.dialogRef.close();
    });
    this.dialogRef.componentInstance.deleteEvent.subscribe((employee: Employee) => {
      this.delete(employee)
    });

  }
  delete(employee: Employee) {
    this.ManagementWorkerServices.DeleteWorker(employee.id).subscribe(res => {
      console.log(res)
      res.isSuccess ? [this.dialogRef.close(), this.getWorkers()] : ''
    })
  }
  editWorker(employee: Employee) {
    this.router.navigate(['/worker-management/workers/edit'], {
      queryParams: { id: employee.id }
    });
  }
  detailesWorker(employee: Employee) {
    this.router.navigate(['/worker-management/workers/detailes'], {
      queryParams: { id: employee.id }
    });
  }
}
