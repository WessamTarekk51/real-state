import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PaymentsManagementServices } from '../../payments-management-services';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { forkJoin } from 'rxjs';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { Button } from "src/app/shared/components/button/button";
import { CreateNewInCome } from 'src/app/shared/models/payment/inCome';
import { attachment } from 'src/app/shared/models/real-state/attachment';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropDownClients } from 'src/app/shared/models/customer/client';
import { CustomerManagementServices } from 'src/app/features/customer-management/customer-management-services';
import { DropDownContracts } from 'src/app/shared/models/contract';
import { SalesServices } from 'src/app/features/sales-management/sales-services';

@Component({
  selector: 'app-create-income',
  imports: [ToastModule,ReactiveFormsModule, InputSelect, ControlMessages, InputNum, InputDate, InputUpload, InputTextArea, Button],
  templateUrl: './create-income.html',
  styleUrl: './create-income.scss',
  standalone: true,
  providers: [MessageService],
})
export class CreateIncome {
  pageTitle: string = 'إضافة مدفوع وارد';
  createIncome!: FormGroup;
  DropDownLands: DropDownLands[];
  DropDownBuildings: DropDownBuildings[];
  DropDownUnits: DropDownUnits[];
  transactionTypes = signal<LookUpItem[]>([]);
  paymentMethods = signal<LookUpItem[]>([]);
  newIncome: CreateNewInCome;
  attachmentsFiles: attachment[];
  DropDownClients = signal<DropDownClients[]>([]);
  DropDownContract = signal<DropDownContracts[]>([]);

  receipt: string;
  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private PaymentsManagementServices: PaymentsManagementServices,
    private RealStateServices: RealStateServices,
    private messageService: MessageService,
    private CustomerManagementServices:CustomerManagementServices,
    private SalesServices:SalesServices
  ) {
    this.createIncome = this.fb.group({
      contractId: ['', Validators.required],
      contractInstallmentId: ['', Validators.required],
      clientId: ['', Validators.required],
      transactionTypeId: ['', Validators.required],
      amount: ['', Validators.required],
      paymentMethodId: ['', Validators.required],
      paymentDate: ['', Validators.required],
      notes: [''],
      receipt: ['', Validators.required]
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
      receipt: this.RealStateServices.GetLookUpItemByCode(
        'attachment_type',
        this.attachmentsFiles[0].elementId
      ),
      getDropDownLands: this.RealStateServices.getDropDownLands(),
      getDropDownBuilding: this.RealStateServices.getDropDownBuildings(),
      getDropDownUnit: this.RealStateServices.getDropDownUnits(),
      transactionTypes: this.RealStateServices.GetLookUpSetByCode('transaction_type'),
      paymentMethods: this.RealStateServices.GetLookUpSetByCode('payment_method'),
      getDropDownClients: this.CustomerManagementServices.getDropDownClients(),
      getDropDownContract: this.SalesServices.getDropDownContracts(),

    }).subscribe(({getDropDownContract,getDropDownClients,receipt, getDropDownLands, getDropDownBuilding, getDropDownUnit, transactionTypes,paymentMethods }) => {
      if (getDropDownLands.isSuccess) {
        this.DropDownLands = getDropDownLands.value;
      }
      if (getDropDownBuilding.isSuccess) {
        this.DropDownBuildings = getDropDownBuilding.value;
      }
      if (getDropDownUnit.isSuccess) {
        this.DropDownUnits = getDropDownUnit.value;
      }
      if (transactionTypes?.isSuccess) {
        const mapped = transactionTypes.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.transactionTypes.set(mapped);
      }
       if (paymentMethods?.isSuccess) {
        const mapped = paymentMethods.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.paymentMethods.set(mapped);
      }
      if (getDropDownClients.isSuccess) {
        const mapped = getDropDownClients.value.map((el) => ({
          ...el,
          id: el.nationalId,
        }));
        this.DropDownClients.set(mapped);

      }
      if (getDropDownContract.isSuccess) {
        const mapped = getDropDownContract.value.map((el) => ({
          ...el,
        }));
        this.DropDownContract.set(mapped);

      }
      if (receipt?.isSuccess) {
        this.receipt = receipt.value.id;
        this.attachmentsFiles[0].attachmentId = this.receipt;
      }
    });
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
  createNewIncome() {
    console.log(this.createIncome.valid)
    console.log(this.createIncome)

    if (this.createIncome.valid) {
      this.newIncome = {
        ...this.createIncome.value,
        amount: Number(this.createIncome.value.amount),
        attachments: this.attachmentsFiles,
      };
      this.PaymentsManagementServices.CreateIncome(this.newIncome).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'تم الإنشاء  بنجاح',
            });
            this.createIncome.reset();
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
      this.validateAllFields(this.createIncome);
    }
  }
}

