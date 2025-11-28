import { Component, computed, Input, signal } from '@angular/core';
import { InputTxt } from 'src/app/shared/components/input-txt/input-txt';
import { InputSelect } from 'src/app/shared/components/input-select/input-select';
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { InputTextArea } from 'src/app/shared/components/input-text-area/input-text-area';
import { InputUpload } from 'src/app/shared/components/input-upload/input-upload';
import { Button } from 'src/app/shared/components/button/button';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RealStateServices } from '../../real-state-services';
import { NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ControlMessages } from 'src/app/shared/components/control-messages/control-messages';
import { ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CreateNewLand, LandDetailes } from 'src/app/shared/models/real-state/land';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { attachment } from 'src/app/shared/models/real-state/attachment';

@Component({
  selector: 'app-create-land',
  imports: [
    InputTxt,
    InputSelect,
    InputNum,
    InputTextArea,
    InputUpload,
    Button,
    ReactiveFormsModule,
    NgIf,
    ControlMessages,
    ToastModule
  ],
  templateUrl: './create-land.html',
  styleUrl: './create-land.scss',
  providers: [MessageService],
  standalone: true
})
export class CreateLand implements AfterViewInit {
  pageTitle: string = 'إضافة قطعة أرض جديدة';
  createLands!: FormGroup;
  attachmentsFiles: attachment[];
  Governorates = signal<LookUpItem[]>([]);
  Cities = signal<LookUpItem[]>([]);
  Districtes = signal<LookUpItem[]>([]);
  newLand: CreateNewLand;
  dataLoaded = computed(
    () =>
      this.Governorates().length > 0 &&
      this.Cities().length > 0 &&
      this.Districtes().length > 0
  );
  BulidingPermit: string;
  OwnershipCertificate: string;
  OwnershipContract: string;
  RealStateRegistrationDocuments: string;
  @Input() edit: boolean;
  @Input() landEdited: LandDetailes;
  constructor(
    private fb: UntypedFormBuilder,
    private RealStateServices: RealStateServices,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.createLands = this.fb.group({
      name: ['', Validators.required],
      governorateId: ['', Validators.required],
      cityId: ['', Validators.required],
      districtId: ['', Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      latitude: [0.1, Validators.required],
      longitude: [0.1, Validators.required],
      description: ['', Validators.required],
      BulidingPermit: ['', Validators.required],
      OwnershipCertificate: ['', Validators.required],
      OwnershipContract: ['', Validators.required],
      RealStateRegistrationDocuments: ['', Validators.required],
      area: ['2']
    });
    this.newLand = {
      name: '',
      governorateId: '',
      cityId: '',
      districtId: '',
      length: 0,
      width: 0,
      latitude: 0,
      longitude: 0,
      description: '',
      attachments: []
    };
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.attachmentsFiles = [
      {
        elementId: 'buliding_permit',
        attachmentId: '',
      },
      {
        elementId: 'ownership_certificate',
        attachmentId: '',
      },
      {
        elementId: 'ownership_contract',
        attachmentId: '',
      },
      {
        elementId: 'RealState_registration_documents',
        attachmentId: '',
      },
    ];
    this.getLookup();
  }

  getLookup() {
    forkJoin({
      governorates: this.RealStateServices.GetLookUpSetByCode('governorate'),
      cities: this.RealStateServices.GetLookUpSetByCode('city'),
      districts: this.RealStateServices.GetLookUpSetByCode('district'),
      BulidingPermit: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[0].elementId),
      OwnershipCertificate: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[1].elementId),
      OwnershipContract: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[2].elementId),
      RealStateRegistrationDocuments: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[3].elementId),
    }).subscribe(({ governorates, cities, districts, BulidingPermit, OwnershipCertificate, OwnershipContract, RealStateRegistrationDocuments }) => {
      if (governorates?.isSuccess) {
        const mapped = governorates.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.Governorates.set(mapped);
      }
      if (cities?.isSuccess) {
        const mapped = cities.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.Cities.set(mapped);
      }
      if (districts?.isSuccess) {
        const mapped = districts.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.Districtes.set(mapped);
      }
      if (BulidingPermit?.isSuccess) {
        this.BulidingPermit = BulidingPermit.value.id
        this.attachmentsFiles[0].attachmentId = this.BulidingPermit
      }
      if (OwnershipCertificate?.isSuccess) {
        this.OwnershipCertificate = OwnershipCertificate.value.id
        this.attachmentsFiles[1].attachmentId = this.OwnershipCertificate
      }
      if (OwnershipContract?.isSuccess) {
        this.OwnershipContract = OwnershipContract.value.id
        this.attachmentsFiles[2].attachmentId = this.OwnershipContract
      }
      if (RealStateRegistrationDocuments?.isSuccess) {
        this.RealStateRegistrationDocuments = RealStateRegistrationDocuments.value.id
        this.attachmentsFiles[3].attachmentId = this.RealStateRegistrationDocuments
      }
      this.edit ? this.getEditedData() : ''
    });
  }
  addLand() {
    if (this.createLands.valid) {
      this.newLand = { ...this.createLands.value, attachments: this.attachmentsFiles };
      this.RealStateServices.CreateLands(this.newLand).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء الأرض بنجاح' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
      this.createLands.reset();
    } else {
      this.validateAllFields(this.createLands);
    }
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

  getGovernorateById(name: string) {
    let id = this.Governorates().find(el => el.name == name)?.id;
    return id;
  }
  getEditedData() {

    this.createLands.patchValue({
      name: this.landEdited.name,
      length: this.landEdited.length,
      width: this.landEdited.width,
      latitude: this.landEdited.latitude,
      longitude: this.landEdited.longitude,
      description: this.landEdited.description,
      governorateId: this.getGovernorateById(this.landEdited.governorateName.ar),
      area: this.landEdited.length * this.landEdited.width

    });
  }


  getcaluArea(length: any) {
    console.log(length)
    this.createLands.value.width != null && this.createLands.value.length ? this.getArea() : ''
  }

  getArea() {
    this.createLands.patchValue({
      area: this.createLands.value.width * this.createLands.value.length
    });
  }


}
