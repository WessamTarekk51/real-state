import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { RadiosButton } from "src/app/shared/components/radios-button/radios-button";
import { Button } from "src/app/shared/components/button/button";
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserManagementServices } from '../../user-management-services';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { Role } from 'src/app/shared/models/user/role';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-user',
  imports: [InputTxt, InputSelect, RadiosButton, Button, ControlMessages,ToastModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss',
  standalone: true,
  providers: [MessageService]

})
export class CreateUser {
  pageTitle: string = 'إضافة مستخدم جديد';
  createUser!: FormGroup;
  roles: Role[]
  constructor(private messageService: MessageService, private fb: UntypedFormBuilder, private UserManagementServices: UserManagementServices, private RealStateServices: RealStateServices) {
    this.createUser = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      roleIds: ['', Validators.required],
      password: ['', Validators.required],
      active: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getRoles()
  }
  getRoles() {
    this.UserManagementServices.getRoles().subscribe(res => {
      if (res.isSuccess) {
        this.roles = res.value
      }
    })
  }
  createNewUser() {
    if (this.createUser.valid) {
      this.UserManagementServices.CreateUser(this.createUser.value).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء المستخدم بنجاح' });
            this.createUser.reset();
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );

    } else {
      this.validateAllFields(this.createUser)
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
