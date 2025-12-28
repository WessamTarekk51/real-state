import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InputTxt } from 'src/app/shared/components/input-txt/input-txt';
import { ControlMessages } from 'src/app/shared/components/control-messages/control-messages';
import { Button } from 'src/app/shared/components/button/button';
import { CreateNewClient } from 'src/app/shared/models/customer/client';
import { MessageService } from 'primeng/api';
import { CustomerManagementServices } from '../../customer-management-services';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-client',
  imports: [ToastModule,ReactiveFormsModule, InputTxt, ControlMessages, Button],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss',
  providers: [MessageService],
  standalone: true,
})
export class CreateClient {
  pageTitle: string = 'إضافة عميل جديد ';

  createClient!: FormGroup;
  newClient: CreateNewClient;

  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private CustomerManagementServices: CustomerManagementServices
  ) {
    this.createClient = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      nationalId: ['', Validators.required],
      address: [''],
      attachments:[[{}]]
    });
    this.newClient = {
      name: '',
      phone: '',
      email: '',
      nationalId: '',
      address: '',
      attachments: [{}],
    };
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  createNewClient() {
    console.log(this.createClient);
    if (this.createClient.valid) {
      this.newClient = { ...this.createClient.value };
      this.CustomerManagementServices.CreateClient(this.newClient).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'تم إنشاء العميل بنجاح',
            });
            this.createClient.reset();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'حدث خطأ',
              detail: 'حاول مرة أخري.',
            });
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'حدث خطأ',
            detail: 'حاول مرة أخري.',
          });
        }
      );
    } else {
      this.validateAllFields(this.createClient);
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
