import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { Button } from "src/app/shared/components/button/button";
import { ManagementWorkerServices } from '../../management-worker-services';
import { ToastModule } from 'primeng/toast';
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { WorkerDetailes } from 'src/app/shared/models/customer/employess';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-worker',
  imports: [ReactiveFormsModule, InputTxt, ControlMessages, Button, ToastModule, InputSelect],
  templateUrl: './create-worker.html',
  styleUrl: './create-worker.scss',
  providers: [MessageService],
  standalone: true
})
export class CreateWorker {
  pageTitle: string = 'إضافة عامل جديد';
  createWorker!: FormGroup;
  Jobs = signal<LookUpItem[]>([]);

  edit: boolean = false;
  WorkerID: string;
  WorkerDetailesEdit: WorkerDetailes;
  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private workerServices: ManagementWorkerServices,
    private messageService: MessageService,
    private RealStateServices: RealStateServices,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createWorker = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      jobStatusId: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.getJobs();
    this.isEditRoute();

  }
  isEditRoute() {
    this.edit = this.router.url.includes('edit');
    this.edit
      ? [
        (this.WorkerID = String(
          this.activatedRoute.snapshot.queryParamMap.get('id')
        )),
        this.getEditedData(),
        (this.pageTitle = ' تعديل عامل  '),
      ]
      : (this.pageTitle = 'إضافة عامل جديد');
    this.cd.markForCheck();
  }
  addWorker() {
    if (this.createWorker.valid) {
      this.workerServices.CreateWorker(this.createWorker.value).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إضافة العامل بنجاح' });
            this.createWorker.reset();
            this.pageRoles()
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
    } else {
      this.validateAllFields(this.createWorker);
    }
  }
  validateAllFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFields(control);
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
      console.log(this.Jobs())
      this.cd.markForCheck()
    })


  }
  getEditedData() {
    this.workerServices.GetWorkerByID(this.WorkerID).subscribe((res) => {
      this.WorkerDetailesEdit = res.value;
      this.createWorker.patchValue({
        name: this.WorkerDetailesEdit.name,
        phone: this.WorkerDetailesEdit.phone,
        jobStatusId: ''
      });
    });
  }
  editWorker() {
    if (this.createWorker.valid) {
      this.workerServices.UpdateWorker(
        this.createWorker.value,
        this.WorkerID
      ).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'تم تعديل العامل بنجاح',
            });
            this.pageRoles()
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'حدث خطأ',
              detail: 'حاول مرة أخري.',
            });
          }
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'حدث خطأ',
            detail: 'حاول مرة أخري.',
          });
        }
      );

    } else {
      this.validateAllFields(this.createWorker);
    }
  }
  pageRoles() {
    this.router.navigate(['/worker-management/workers']);
  }
}
