import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { InputTxt } from 'src/app/shared/components/input-txt/input-txt';
import { InputSelect } from 'src/app/shared/components/input-select/input-select';
import { InputDate } from 'src/app/shared/components/input-date/input-date';
import { InputTextArea } from 'src/app/shared/components/input-text-area/input-text-area';
import { Button } from 'src/app/shared/components/button/button';
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { InputUpload } from 'src/app/shared/components/input-upload/input-upload';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ControlMessages } from 'src/app/shared/components/control-messages/control-messages';
import { forkJoin } from 'rxjs';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { Table } from 'src/app/shared/components/table/table';
import { CustomerManagementServices } from 'src/app/features/customer-management/customer-management-services';
import { DropDownClients } from 'src/app/shared/models/customer/client';
import { ManagementWorkerServices } from 'src/app/features/management-workers-technicians/management-worker-services';
import { Employee } from 'src/app/shared/models/customer/employess';
import { attachment } from 'src/app/shared/models/real-state/attachment';
import {
  ContractDetailes,
  CreateNewContract,
} from 'src/app/shared/models/contract';
import { SalesServices } from '../../sales-services';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-contract',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgFor,
    InputTxt,
    InputSelect,
    InputDate,
    InputTextArea,
    Button,
    InputNum,
    InputUpload,
    ControlMessages,
    Table,
    ToastModule,
    NgIf,
  ],
  templateUrl: './create-contract.html',
  styleUrl: './create-contract.scss',
  providers: [MessageService],
  standalone:true
})
export class CreateContract {
  buttons: any[];
  activeTab: number = 1;
  createContract!: FormGroup;
  installmentForm!: FormGroup;
  cols: any[];
  installment: boolean = false;
  pageTitle: string = 'إنشاء عقد جديد';
  contractTypes = signal<LookUpItem[]>([]);
  unitTypes = signal<LookUpItem[]>([]);
  DropDownLands: DropDownLands[];
  DropDownBuildings: DropDownBuildings[];
  DropDownUnits: DropDownUnits[];
  DropDownClients = signal<DropDownClients[]>([]);
  DropDownWorkers: Employee[];
  optaionsInstallment: any[];
  attachmentsFiles: attachment[];
  BulidingPermit: string;
  newContract: CreateNewContract;
  dataLoaded: boolean = false;

  contractEdited: ContractDetailes;
  contractId: string;
  edit: boolean = false;
  photos: any[] = ['photo1'];
  constructor(
    private fb: UntypedFormBuilder,
    private RealStateServices: RealStateServices,
    private CustomerManagementServices: CustomerManagementServices,
    private ManagementWorkerServices: ManagementWorkerServices,
    private sales: SalesServices,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private SalesServices: SalesServices,
  ) {
    this.createContract = this.fb.group({
      contractDate: ['', Validators.required],
      totalPrice: ['', Validators.required],
      contractTypeId: ['', Validators.required],
      notes: [''],

      landId: ['', Validators.required],
      buildingId: ['', Validators.required],
      unitId: ['', Validators.required],
      unitPriceAtContract: ['', Validators.required],

      clientNationalId: ['', Validators.required],

      employeeId: ['', Validators.required],
      isInstallmentPlan: ['', Validators.required],

      BulidingPermit: ['', Validators.required],

      installments: this.fb.array([]),
    });
    this.installmentForm = this.fb.group({
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      amount: ['', Validators.required],
      amountText: ['', Validators.required],
    });
    this.newContract = {
      contractDate: '',
      totalPrice: '',
      contractTypeId: '',
      clientNationalId: '',
      notes: '',
      landId: '',
      buildingId: '',
      unitId: '',
      employeeId: '',
      unitPriceAtContract: 0,
      isInstallmentPlan: false,
      installments: [],
      attachments: [],
    };
  }
  get installments(): FormArray {
    return this.createContract.get('installments') as FormArray;
  }
  addInstallment() {
    if (this.installmentForm.invalid) return;
    if (this.installmentForm.valid) {
      this.installments.push(this.fb.group(this.installmentForm.value));
      console.log(this.createContract.value);
      this.installmentForm.reset(); // clear sub form
    } else {
      this.installmentForm.markAllAsTouched();
      this.validateAllFields(this.installmentForm);
    }
  }
  ngOnInit(): void {
    this.buttons = [
      {
        name: ' بيانات العقد الأساسية',
        type: 1,
        active: true,
      },
      {
        name: 'تفاصيل الوحدة',
        type: 2,
        active: false,
      },
      {
        name: 'تفاصيل العميل',
        type: 3,
        active: false,
      },
      {
        name: 'خطة الدفع / التقسيط',
        type: 4,
        active: false,
      },
      {
        name: 'المستندات والمرفقات',
        type: 5,
        active: false,
      },
    ];
    this.cols = [
      { field: 'description', header: 'تفاصيل  القسط' },
      { field: 'dueDate', header: 'تاريخ  الاستحقاق ' },
      { field: 'amount', header: ' قيمة القسط بالأرقام' },
      { field: 'amountText', header: ' قيمة القسط بالحروف' },
      { field: '', header: 'التحكم', controlInstallment: true },
    ];
    this.optaionsInstallment = [
      {
        name: 'نعم',
        id: true,
      },
      {
        name: 'لا',
        id: false,
      },
    ];
    this.attachmentsFiles = [
      {
        elementId: 'photo',
        attachmentId: '',
      },
    ];
    this.GetLookUp();
  }
  GetLookUp() {
    forkJoin({
      getDropDownLands: this.RealStateServices.getDropDownLands(),
      getDropDownBuilding: this.RealStateServices.getDropDownBuildings(),
      getDropDownUnit: this.RealStateServices.getDropDownUnits(),
      getDropDownClients: this.CustomerManagementServices.getDropDownClients(),
      contractTypes: this.RealStateServices.GetLookUpSetByCode('contract_type'),
      unitTypes: this.RealStateServices.GetLookUpSetByCode('unit_type'),
      getDropDownWorkers: this.ManagementWorkerServices.GetDropDownWorkers(),
      BulidingPermit: this.RealStateServices.GetLookUpItemByCode(
        'attachment_type',
        this.attachmentsFiles[0].elementId
      ),
    }).subscribe(
      ({
        getDropDownLands,
        getDropDownBuilding,
        getDropDownUnit,
        contractTypes,
        unitTypes,
        getDropDownClients,
        getDropDownWorkers,
        BulidingPermit,
      }) => {
        if (contractTypes?.isSuccess) {
          const mapped = contractTypes.value.items.map((el) => ({
            ...el,
            name: el.descriptions.ar,
          }));
          this.contractTypes.set(mapped);
        }
        if (unitTypes?.isSuccess) {
          const mapped = unitTypes.value.items.map((el) => ({
            ...el,
            name: el.descriptions.ar,
          }));
          this.unitTypes.set(mapped);
        }
        if (getDropDownLands.isSuccess) {
          this.DropDownLands = getDropDownLands.value;
        }
        if (getDropDownBuilding.isSuccess) {
          this.DropDownBuildings = getDropDownBuilding.value;
        }
        if (getDropDownUnit.isSuccess) {
          this.DropDownUnits = getDropDownUnit.value;
        }
        if (getDropDownClients.isSuccess) {
          const mapped = getDropDownClients.value.map((el) => ({
            ...el,
            id: el.nationalId,
          }));
          this.DropDownClients.set(mapped);
        }
        if (getDropDownWorkers.isSuccess) {
          this.DropDownWorkers = getDropDownWorkers.value.items;
        }
        if (BulidingPermit?.isSuccess) {
          this.BulidingPermit = BulidingPermit.value.id;
          this.attachmentsFiles[0].attachmentId = this.BulidingPermit;
        }
        this.isEditRoute();
        this.dataLoaded = true;
      }
    );
  }
  toggleButton(button: any) {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    button.active = true;
    this.activeTab = button.type;
  }
  prevTab() {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    this.activeTab -= 1;
    this.buttons[this.activeTab - 1].active = true;
  }
  nextTab() {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    this.activeTab += 1;
    this.buttons[this.activeTab - 1].active = true;
    console.log(this.createContract.value);
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
  deleteInstallment(index: number) {
    console.log(index);
    this.createContract.value.installments.splice(index, 1);
  }
  editInstallment(index: any) {
    this.installmentForm.patchValue({
      description: this.createContract.value.installments[index].description,
      dueDate: this.createContract.value.installments[index].dueDate,
      amount: this.createContract.value.installments[index].amount,
      amountText: this.createContract.value.installments[index].amountText,
    });
  }
  getvalue(event: any) {
    event == 'true'
      ? ((this.installment = true),
        (this.createContract.value.isInstallmentPlan = true))
      : ((this.installment = false),
        (this.createContract.value.isInstallmentPlan = false));
    console.log(this.createContract.value);
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

  getBoolaen(event: any) {
    event == 'true'
      ? ((this.installment = true),
        (this.createContract.value.isInstallmentPlan = true))
      : ((this.installment = false),
        (this.createContract.value.isInstallmentPlan = false));
    return this.createContract.value.isInstallmentPlan;
  }

  addContract() {
    console.log(this.createContract.value)

    if (this.createContract.valid) {
      this.newContract = {
        ...this.createContract.value,
        attachments: this.attachmentsFiles,
        totalPrice: Number(this.createContract.value.totalPrice),
        unitPriceAtContract: Number(
          this.createContract.value.unitPriceAtContract
        ),
        isInstallmentPlan: this.getBoolaen(
          this.createContract.value.isInstallmentPlan
        ),
        installments: this.createContract.value.installments.map((el: any) => ({
          ...el,
          amount: Number(el.amount),
        })),
      };
      this.sales.CreateContract(this.newContract).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'تم إنشاء الأرض بنجاح',
            });
            this.createContract.reset();
            this.GOContractHome()
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
      this.validateAllFields(this.createContract);
    }
  }
  isEditRoute() {
    this.edit = this.router.url.includes('edit');
    this.edit
      ? [
          (this.contractId = String(
            this.activatedRoute.snapshot.queryParamMap.get('id')
          )),
          this.getEditedData(),
          (this.photos = ['photo1']),
          (this.pageTitle = 'تعديل الأرض '),
        ]
      : (this.pageTitle = 'إضافة قطعة أرض جديدة');
    this.cd.markForCheck();
  }
  getEditedData() {
    this.SalesServices.GetContractsByID(this.contractId).subscribe((res) => {
      if (res.isSuccess) {
        this.contractEdited = res.value;
        console.log(this.contractEdited);
        console.log(this.contractEdited.installments);
        this.createContract.patchValue({
          contractDate: this.contractEdited.contractDate?.split('T')[0],
          totalPrice: this.contractEdited.totalPrice,
          contractTypeId: this.contractEdited.contractTypeId,
          notes: this.contractEdited.notes,
          landId: this.getLandById(this.contractEdited.landName),
          buildingId: this.getBulidingById(this.contractEdited.buildingName),
          unitId: this.getUnitById(this.contractEdited.unitName),
          unitPriceAtContract: this.contractEdited.unitPriceAtContract,
          clientNationalId: this.contractEdited.clientNationalId,
          employeeId:
          "019b8a0c-be3d-7033-a940-5cf99ff330c1",
          isInstallmentPlan: this.contractEdited.isInstallmentPlan,
          BulidingPermit: this.contractEdited.attachments.find(
            (x) => x.elementId === 'photo'
          )?.attachmentId,
        });
        this.installments.clear();
        this.contractEdited.installments.forEach((inst) => {
          this.installments.push(
            this.fb.group({
              description: [inst.description, Validators.required],
              dueDate: [inst.dueDate?.split('T')[0], Validators.required],
              amount: [inst.amount, Validators.required],
              amountText: [inst.amountText, Validators.required],
            })
          );
        });
        this.installment = this.contractEdited.isInstallmentPlan;
        this.attachmentsFiles = this.contractEdited.attachments;
        this.cd.detectChanges();
      }
    });
  }
  GOContractHome() {
    this.router.navigate(['/sales-management/contracts']);
  }

  getLandById(name: string) {
    console.log(this.DropDownLands);
    let id = this.DropDownLands.find((el) => el.name?.includes(name))?.id;
    return id;
  }

  getBulidingById(name: string) {
    let id = this.DropDownBuildings.find((el) => el.name?.includes(name))?.id;
    return id;
  }
  getUnitById(name: string) {
    let id = this.DropDownUnits.find((el) => el.name?.includes(name))?.id;
    return id;
  }

  editContract() {
    if (this.createContract.valid) {
      this.newContract = {
        ...this.createContract.value,
        attachments: this.attachmentsFiles,
        totalPrice: Number(this.createContract.value.totalPrice),
        unitPriceAtContract: Number(
          this.createContract.value.unitPriceAtContract
        ),
        isInstallmentPlan: this.getBoolaen(
          this.createContract.value.isInstallmentPlan
        ),
        installments: this.createContract.value.installments.map((el: any) => ({
          ...el,
          amount: Number(el.amount),
        })),
      };
      this.SalesServices.UpdateContract(this.contractId, this.newContract).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم تعديل العقد بنجاح' });
            this.createContract.reset();
            this.GOContractHome()
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
    } else {
      this.validateAllFields(this.createContract);
    }

  }



}
