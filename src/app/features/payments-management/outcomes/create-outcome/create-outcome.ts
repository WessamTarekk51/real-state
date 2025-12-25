import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InputSelect } from 'src/app/shared/components/input-select/input-select';
import { ControlMessages } from 'src/app/shared/components/control-messages/control-messages';
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { InputDate } from 'src/app/shared/components/input-date/input-date';
import { InputUpload } from 'src/app/shared/components/input-upload/input-upload';
import { InputTextArea } from 'src/app/shared/components/input-text-area/input-text-area';
import { Button } from 'src/app/shared/components/button/button';
import { forkJoin } from 'rxjs';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { attachment } from 'src/app/shared/models/real-state/attachment';
import { NgIf } from '@angular/common';
import { CreateNewOutCome } from 'src/app/shared/models/payment/outCome';
import { PaymentsManagementServices } from '../../payments-management-services';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-outcome',
  imports: [
    ReactiveFormsModule,
    InputSelect,
    ControlMessages,
    InputNum,
    InputDate,
    InputUpload,
    InputTextArea,
    Button,
    NgIf,
    ToastModule,
  ],
  templateUrl: './create-outcome.html',
  styleUrl: './create-outcome.scss',
  standalone: true,
  providers: [MessageService],
})
export class CreateOutcome {
  pageTitle: string = 'إضافة مدفوع خارج';
  createOutcome!: FormGroup;

  beneficiaryTypes = signal<LookUpItem[]>([]);
  expenseTypes = signal<LookUpItem[]>([]);
  paymentMethods = signal<LookUpItem[]>([]);
  DropDownBuildings: DropDownBuildings[];
  DropDownUnits: DropDownUnits[];
  attachmentsFiles: attachment[];
  receipt: string;
  newOutCome: CreateNewOutCome;

  dataLoaded = computed(() => this.beneficiaryTypes.length > 0);
  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private RealStateServices: RealStateServices,
    private PaymentsManagementServices: PaymentsManagementServices,
    private messageService: MessageService
  ) {
    this.createOutcome = this.fb.group({
      beneficiaryId: ['', Validators.required],
      expenseTypeId: ['', Validators.required],
      buildingId: ['', Validators.required],
      unitId: ['', Validators.required],
      amount: [null, Validators.required],
      paymentMethodId: ['', Validators.required],
      paymentDate: ['', Validators.required],
      notes: [''],
      receipt: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
  ngOnInit(): void {
    this.attachmentsFiles = [
      {
        elementId: 'receipt',
        attachmentId: '',
      },
    ];
    this.GetLookUp();
  }
  GetLookUp() {
    forkJoin({
      beneficiaryTypes:
        this.RealStateServices.GetLookUpSetByCode('beneficiary_type'),
      expenseTypes: this.RealStateServices.GetLookUpSetByCode('expense_type'),
      paymentMethods:
        this.RealStateServices.GetLookUpSetByCode('payment_method'),
      getDropDownBuilding: this.RealStateServices.getDropDownBuildings(),
      getDropDownUnit: this.RealStateServices.getDropDownUnits(),
      receipt: this.RealStateServices.GetLookUpItemByCode(
        'attachment_type',
        this.attachmentsFiles[0].elementId
      ),
    }).subscribe(
      ({
        receipt,
        beneficiaryTypes,
        expenseTypes,
        paymentMethods,
        getDropDownBuilding,
        getDropDownUnit,
      }) => {
        if (beneficiaryTypes?.isSuccess) {
          const mapped = beneficiaryTypes.value.items.map((el) => ({
            ...el,
            name: el.descriptions.ar,
          }));
          this.beneficiaryTypes.set(mapped);
        }
        if (expenseTypes?.isSuccess) {
          const mapped = expenseTypes.value.items.map((el) => ({
            ...el,
            name: el.descriptions.ar,
          }));
          this.expenseTypes.set(mapped);
        }
        if (paymentMethods?.isSuccess) {
          const mapped = paymentMethods.value.items.map((el) => ({
            ...el,
            name: el.descriptions.ar,
          }));
          this.paymentMethods.set(mapped);
        }
        if (getDropDownBuilding.isSuccess) {
          this.DropDownBuildings = getDropDownBuilding.value;
        }
        if (getDropDownUnit.isSuccess) {
          this.DropDownUnits = getDropDownUnit.value;
        }
        if (receipt?.isSuccess) {
          this.receipt = receipt.value.id;
          this.attachmentsFiles[0].attachmentId = this.receipt;
        }
      }
    );
  }
  uploadDocument(file: File, index: number, code: string) {
    const formData = new FormData();
    formData.append('file', file);
    this.RealStateServices.uploadDocument(formData, code).subscribe((res) => {
      if (res.isSuccess) {
        const id = res.value;
        this.attachmentsFiles[index].attachmentId = id;
      }
    });
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
  createNewUnit() {
    if (this.createOutcome.valid) {
      this.newOutCome = {
        ...this.createOutcome.value,
        amount: Number(this.createOutcome.value.amount),
        attachments: this.attachmentsFiles,
      };
      this.PaymentsManagementServices.CreateOutcome(this.newOutCome).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'تم إنشاء الوحدة بنجاح',
            });
            this.createOutcome.reset();
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
      this.validateAllFields(this.createOutcome);
    }
  }
}
