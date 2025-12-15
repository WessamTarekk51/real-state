import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { Button } from "src/app/shared/components/button/button";
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { NgFor, NgIf } from '@angular/common';
import { UserManagementServices } from '../../user-management-services';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-role',
  imports: [ToastModule, InputTxt, Button, ControlMessages, NgFor, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './create-role.html',
  styleUrl: './create-role.scss',
  standalone: true,
  providers: [MessageService]
})
export class CreateRole {
  pageTitle: string = 'انشاء دور جديد';
  createRole!: FormGroup;
  permissions = [
    {
      name: 'العقود',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Contracts.View' },
        create: { value: false, code: 'Permissions.Contracts.Create' },
        update: { value: false, code: 'Permissions.Contracts.Edit' },
        delete: { value: false, code: 'Permissions.Contracts.Delete' }
      }
    },
    {
      name: 'المستندات',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Documents.View' },
        delete: { value: false, code: 'Permissions.Documents.Delete' },
        upload: { value: false, code: 'Permissions.Documents.Upload' },
        download: { value: false, code: 'Permissions.Documents.Download' },
      }
    },
    {
      name: 'الموارد البشرية',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.HR.View' },
        create: { value: false, code: 'Permissions.HR.Create' },
        update: { value: false, code: 'Permissions.HR.Edit' },
        delete: { value: false, code: 'Permissions.HR.Delete' }
      }
    },
    {
      name: 'الهوية',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Identity.View' },
        create: { value: false, code: 'Permissions.Identity.Create' },
        update: { value: false, code: 'Permissions.Identity.Edit' },
        delete: { value: false, code: 'Permissions.Identity.Delete' }
      }
    },
    {
      name: 'العملاء',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Clients.View' },
        create: { value: false, code: 'Permissions.Clients.Create' },
        update: { value: false, code: 'Permissions.Clients.Edit' },
        delete: { value: false, code: 'Permissions.Clients.Delete' }
      }
    },
    {
      name: 'القوائم',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Lookups.View' },
        create: { value: false, code: 'Permissions.Lookups.Create' },
        update: { value: false, code: 'Permissions.Lookups.Edit' },
        delete: { value: false, code: 'Permissions.Lookups.Delete' }
      }
    },
    {
      name: 'المالية',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Finance.View' },
        create: { value: false, code: 'Permissions.Finance.Create' },
        update: { value: false, code: 'Permissions.Finance.Edit' },
        delete: { value: false, code: 'Permissions.Finance.Delete' }
      }
    },
    {
      name: 'التقارير المالية',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Dashboard.ViewFinancialReports' },
      }
    },
    {
      name: 'التحليلات',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Dashboard.ViewAnalytics' },
      }
    },
    {
      name: 'لوحة التحكم',
      permissions: {
        all: { value: false, code: '' },
        view: { value: false, code: 'Permissions.Dashboard.View' },
      }
    }
  ];
  selectedPermissions: string[] = [];
  errorPermissions: boolean = false;
  constructor(private messageService: MessageService, private fb: UntypedFormBuilder, private UserManagementServices: UserManagementServices, private RealStateServices: RealStateServices) {
    this.createRole = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      permissionIds: ['']
    });
  }

  ngOnInit(): void {
    this.getLookUp()
  }

  getLookUp() {
    this.RealStateServices.GetLookUpSetByCode('Permissions').subscribe(res => {
      if (res.isSuccess) {
        res.value.items.forEach(item => {
          this.permissions.forEach(el => {
            Object.values(el.permissions).forEach(perm => {
              if (item.code == perm.code) {
                perm.code = item.id
              }
            });
          });
        })
      }
    })
    console.log(this.permissions)
  }




  togglePermission(group: any, key: string) {
    const permission = group.permissions[key];

    if (permission.value) {
      if (!this.selectedPermissions.includes(permission.code)) {
        this.selectedPermissions.push(permission.code);
      }
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(
        code => code !== permission.code
      );
      group.permissions.all.value = false;
    }

    this.updateSelectAll(group);
    this.createRole.get('permissionIds')?.setValue(this.selectedPermissions);
  }
  toggleAll(group: any) {
    const isChecked = group.permissions.all.value;
    Object.keys(group.permissions).forEach(key => {
      if (key !== 'all') {
        const perm = group.permissions[key];
        perm.value = isChecked;

        if (isChecked) {
          if (!this.selectedPermissions.includes(perm.code)) {
            this.selectedPermissions.push(perm.code);
          }
        } else {
          this.selectedPermissions = this.selectedPermissions.filter(
            code => code !== perm.code
          );
        }
      }
    });
    this.createRole.get('permissionIds')?.setValue(this.selectedPermissions);
  }
  updateSelectAll(group: any) {
    const permissions = Object.keys(group.permissions)
      .filter(key => key !== 'all')
      .map(key => group.permissions[key]);
    group.permissions.all.value = permissions.every(p => p.value);
  }

  createRoleFun() {
    this.errorPermissions = false
    if (this.createRole.valid) {
      if (this.selectedPermissions.length != 0) {
        this.UserManagementServices.CreateRole(this.createRole.value).subscribe(
          (res) => {
            if (res.isSuccess) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء العمارة بنجاح' });
              this.createRole.reset();
              this.selectedPermissions = [];
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
        this.errorPermissions = true
      }
    } else {
      this.validateAllFields(this.createRole)
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
