import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { attachment } from 'src/app/shared/models/real-state/attachment';
import { CreateNewUnit } from 'src/app/shared/models/real-state/unit';
import { RealStateServices } from '../../real-state-services';
import { MessageService } from 'primeng/api';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { forkJoin } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { NgIf } from '@angular/common';
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { RadiosButton } from "src/app/shared/components/radios-button/radios-button";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";
import { Button } from "src/app/shared/components/button/button";
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';

@Component({
  selector: 'app-create-unit',
  imports: [NgIf, ReactiveFormsModule, ToastModule, InputTxt, ControlMessages, InputSelect, InputNum, InputTextArea, RadiosButton, InputUpload, Button],
  templateUrl: './create-unit.html',
  styleUrl: './create-unit.scss',
  providers: [MessageService],
  standalone: true
})
export class CreateUnit {
  pageTitle: string = 'إضافة وحدة سكنية جديدة  ';
  createUnits!: FormGroup;
  attachmentsFiles: attachment[];
  newUnit: CreateNewUnit;
  DropDownBuildings: DropDownBuildings[];
  OwnershipAgreement: string;
  UnitDiagram: string;
  UnitPhotos: string;
  PreviousUtilityBills: string;
  finishingType = signal<LookUpItem[]>([]);
  UnitType = signal<LookUpItem[]>([]);
  UnitStatus = signal<LookUpItem[]>([]);
  dataLoaded = computed(
    () =>
      this.DropDownBuildings.length > 0
  );
  constructor(
    private fb: UntypedFormBuilder,
    private RealStateServices: RealStateServices,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.createUnits = this.fb.group({
      name: ['', Validators.required],
      buildingId: ['', Validators.required],
      unitStatusId: ['', Validators.required],
      floorNumber: [null, Validators.required],
      area: [null, Validators.required],
      numberOfRooms: [null, Validators.required],
      numberOfBatEmployeeooms: [null, Validators.required],
      unitTypeId: ['', Validators.required],
      price: [null, Validators.required],
      finishingTypeId: ['', Validators.required],
      hasBalcony: [null, Validators.required],
      hasGarage: [null, Validators.required],
      hasCentralAC: [null, Validators.required],
      description: ['', Validators.required],
      OwnershipAgreement: ['', Validators.required],
      UnitDiagram: ['', Validators.required],
      UnitPhotos: ['', Validators.required],
      PreviousUtilityBills: ['', Validators.required],
    });
    this.newUnit = {
      name: '',
      buildingId: '',
      unitStatusId: '',
      floorNumber: 0,
      area: 0,
      numberOfRooms: 0,
      numberOfBatEmployeeooms: 0,
      unitTypeId: '',
      price: 0,
      finishingTypeId: '',
      hasBalcony: false,
      hasGarage: false,
      hasCentralAC: false,
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
        elementId: 'ownership_agreement',
        attachmentId: '',
      },
      {
        elementId: 'unit_diagram',
        attachmentId: '',
      },
      {
        elementId: 'unit_photos',
        attachmentId: '',
      },
      {
        elementId: 'previous_utility_bills',
        attachmentId: '',
      },
    ];
    this.getLookup();
  }
  getLookup() {
    forkJoin({
      UnitType: this.RealStateServices.GetLookUpSetByCode('unit_type'),
      finishingType: this.RealStateServices.GetLookUpSetByCode('finishing_type'),
      UnitStatus: this.RealStateServices.GetLookUpSetByCode('unit_status'),

      getDropDownBuildings: this.RealStateServices.getDropDownBuildings(),
      OwnershipAgreement: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[0].elementId),
      UnitDiagram: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[1].elementId),
      UnitPhotos: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[2].elementId),
      PreviousUtilityBills: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[3].elementId),
    }).subscribe(({ UnitStatus,UnitType,finishingType,getDropDownBuildings,OwnershipAgreement,UnitDiagram,UnitPhotos,PreviousUtilityBills }) => {
      if (finishingType?.isSuccess) {
        const mapped = finishingType.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.finishingType.set(mapped);
      }
      if (UnitStatus?.isSuccess) {
        const mapped = UnitStatus.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.UnitStatus.set(mapped);
      }
      if (UnitType?.isSuccess) {
        const mapped = UnitType.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.UnitType.set(mapped);
      }
      if (getDropDownBuildings?.isSuccess) {
        this.DropDownBuildings = getDropDownBuildings.value
      }
      if (OwnershipAgreement?.isSuccess) {
        this.OwnershipAgreement = OwnershipAgreement.value.id
        this.attachmentsFiles[0].attachmentId = this.OwnershipAgreement
      }
      if (UnitDiagram?.isSuccess) {
        this.UnitDiagram = UnitDiagram.value.id
        this.attachmentsFiles[1].attachmentId = this.UnitDiagram
      }
      if (UnitPhotos?.isSuccess) {
        this.UnitPhotos = UnitPhotos.value.id
        this.attachmentsFiles[2].attachmentId = this.UnitPhotos
      }
      if (PreviousUtilityBills?.isSuccess) {
        this.PreviousUtilityBills = PreviousUtilityBills.value.id
        this.attachmentsFiles[3].attachmentId = this.PreviousUtilityBills
      }
    });
  }
  addUnit() {
    if (this.createUnits.valid) {
      this.newUnit = { ...this.createUnits.value, attachments: this.attachmentsFiles };
      this.RealStateServices.CreateUnits(this.newUnit).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء الأرض بنجاح' });
            this.createUnits.reset();
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
    } else {
      this.validateAllFields(this.createUnits);
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
  createNewUnit(){
    console.log(this.createUnits)
    if (this.createUnits.valid) {
      this.newUnit = { ...this.createUnits.value, attachments: this.attachmentsFiles };
      this.RealStateServices.CreateUnits(this.newUnit).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء الوحدة بنجاح' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
      this.createUnits.reset();
    } else {
      this.validateAllFields(this.createUnits);
    }
  }
}
