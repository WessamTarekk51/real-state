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
import {
  ClientDetailes,
  CreateNewClient,
} from 'src/app/shared/models/customer/client';
import { MessageService } from 'primeng/api';
import { CustomerManagementServices } from '../../customer-management-services';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  imports: [
    ToastModule,
    ReactiveFormsModule,
    InputTxt,
    ControlMessages,
    Button,
  ],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss',
  providers: [MessageService],
  standalone: true,
})
export class CreateClient {
  pageTitle: string = 'إضافة عميل جديد ';

  createClient!: FormGroup;
  newClient: CreateNewClient;

  ClientEdited: ClientDetailes;
  ClientId: string;
  edit: boolean = false;
  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private CustomerManagementServices: CustomerManagementServices
  ) {
    this.createClient = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      nationalId: ['', Validators.required],
      address: [''],
      attachments: [[{}]],
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
  ngOnInit(): void {
    this.isEditRoute();
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

  isEditRoute() {
    this.edit = this.router.url.includes('edit');
    this.edit
      ? [
          (this.ClientId = String(
            this.activatedRoute.snapshot.queryParamMap.get('id')
          )),
          this.getEditedData(),
          (this.pageTitle = 'تعديل العميل '),
        ]
      : (this.pageTitle = 'إضافة  عميل جديد');
    this.cd.markForCheck();
  }
  getEditedData() {
    this.CustomerManagementServices.GetClientByID(this.ClientId).subscribe(
      (res) => {
        if (res.isSuccess) {
          this.ClientEdited = res.value;
          console.log(this.ClientEdited);
          this.createClient.patchValue({
            name: this.ClientEdited.name,
            phone: this.ClientEdited.phone,
            email: this.ClientEdited.email,
            nationalId: this.ClientEdited.nationalId,
            address: this.ClientEdited.address,
          });
          this.cd.markForCheck();
        }
      }
    );
  }

  editClient() {
    if (this.createClient.valid) {
      this.newClient = { ...this.createClient.value };
      this.CustomerManagementServices.UpdateClient(
        this.ClientId,
        this.newClient
      ).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'تم تعديل العميل بنجاح',
            });
            this.createClient.reset();
            this.GOHome();
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

  GOHome() {
    this.router.navigate(['/customer-management/clients']);
  }
}
