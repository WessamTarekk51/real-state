import { Component, computed, signal } from '@angular/core';
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
import { GovernorateItem } from 'src/app/shared/models/real-state/governorate';
import { CityItem } from 'src/app/shared/models/real-state/city';
import { DistrictItem } from 'src/app/shared/models/real-state/district';
import { NgIf } from '@angular/common';
// import { InputLocation } from "src/app/shared/components/input-location/input-location";
import { forkJoin } from 'rxjs';
import { ControlMessages } from 'src/app/shared/components/control-messages/control-messages';
import { ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { attachment, CreateNewLand } from 'src/app/shared/models/real-state/land';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
  providers:[MessageService]
})
export class CreateLand implements AfterViewInit {
  pageTitle: string = 'إضافة قطعة أرض جديدة';
  createLands!: FormGroup;
  attachmentsFiles: attachment[];
  Governorates = signal<GovernorateItem[]>([]);
  Cities = signal<CityItem[]>([]);
  Districtes = signal<DistrictItem[]>([]);
  newLand: CreateNewLand;
  dataLoaded = computed(
    () =>
      this.Governorates().length > 0 &&
      this.Cities().length > 0 &&
      this.Districtes().length > 0
  );

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
    this.getLookup();
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
  }

  getLookup() {
    forkJoin({
      governorates: this.RealStateServices.GetGovernorate(),
      cities: this.RealStateServices.GetCity(),
      districts: this.RealStateServices.GetDistrict(),
    }).subscribe(({ governorates, cities, districts }) => {
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
    });
  }
  addLand() {
    if (this.createLands.valid) {
      this.newLand = { ...this.createLands.value, attachments: this.attachmentsFiles };
      this.RealStateServices.CreateLands(this.newLand).subscribe(
        (res) => {
          if(res.isSuccess){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء الأرض بنجاح' });
          }else{
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
  uploadBulidingPermit(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.RealStateServices.uploadBulidingPermit(formData).subscribe((res) => {
      if (res.isSuccess) {
        const id = res.value;
        this.attachmentsFiles[0].attachmentId = id;
      }
    });
  }
  uploadOwnershipCertificate(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.RealStateServices.uploadBulidingPermit(formData).subscribe((res) => {
      if (res.isSuccess) {
        const id = res.value;
        this.attachmentsFiles[1].attachmentId = id;
      }
    });
  }
  uploadOwnershipContract(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.RealStateServices.uploadBulidingPermit(formData).subscribe((res) => {
      if (res.isSuccess) {
        const id = res.value;
        this.attachmentsFiles[2].attachmentId = id;
      }
    });
  }
  uploadRealStateRegistrationDocuments(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.RealStateServices.uploadBulidingPermit(formData).subscribe((res) => {
      if (res.isSuccess) {
        const id = res.value;
        this.attachmentsFiles[3].attachmentId = id;
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
}
