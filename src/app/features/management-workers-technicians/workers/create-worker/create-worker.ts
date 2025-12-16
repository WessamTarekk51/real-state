import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { Button } from "src/app/shared/components/button/button";
import { ManagementWorkerServices } from '../../management-worker-services';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-worker',
  imports: [ReactiveFormsModule, InputTxt, ControlMessages, Button,ToastModule],
  templateUrl: './create-worker.html',
  styleUrl: './create-worker.scss',
  providers: [MessageService],
  standalone: true
})
export class CreateWorker {
  pageTitle: string = 'إضافة عامل جديد';
  createWorker!: FormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private workerServices: ManagementWorkerServices,
    private messageService: MessageService
  ) {
    this.createWorker = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });

  }

  addWorker() {
    if (this.createWorker.valid) {
      this.workerServices.CreateWorker(this.createWorker.value).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء الأرض بنجاح' });
            this.createWorker.reset();
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
}
