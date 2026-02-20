import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { attachment } from 'src/app/shared/models/real-state/attachment';
import { CreateNewUnit, UnitDetailes } from 'src/app/shared/models/real-state/unit';
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
import { ActivatedRoute, Router } from '@angular/router';

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
  dataLoaded: boolean = false;

  UnitEdited: UnitDetailes;
  UnitId: string;
  edit: boolean = false;
  photos: any[] = ["photo1", "photo2", "photo3", "photo4"];
  UnitStatusId: string;
  constructor(
    private fb: UntypedFormBuilder,
    private RealStateServices: RealStateServices,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute

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
    }).subscribe(({ UnitStatus, UnitType, finishingType, getDropDownBuildings, OwnershipAgreement, UnitDiagram, UnitPhotos, PreviousUtilityBills }) => {
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
      this.isEditRoute();
      this.dataLoaded = true
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
  createNewUnit() {
    console.log(this.createUnits)
    if (this.createUnits.valid) {
      this.newUnit = {
        ...this.createUnits.value, attachments: this.attachmentsFiles, floorNumber: Number(this.createUnits.value.floorNumber),
        numberOfRooms: Number(this.createUnits.value.numberOfRooms),
        numberOfBatEmployeeooms: Number(this.createUnits.value.numberOfBatEmployeeooms),
        price: Number(this.createUnits.value.price),
        area: Number(this.createUnits.value.area)

      };
      this.RealStateServices.CreateUnits(this.newUnit).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء الوحدة بنجاح' });
            this.createUnits.reset();
            this.GOUnitHome()

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

  isEditRoute() {
    this.edit = this.router.url.includes('edit');
    this.edit
      ? [
        (this.UnitId = String(
          this.activatedRoute.snapshot.queryParamMap.get('id')
        )),
        this.UnitStatusId = String(this.activatedRoute.snapshot.queryParamMap.get('statusId')),
        this.getEditedData(),
        this.photos = ["photo1", "photo2", "photo3", "photo4"],
        (this.pageTitle = 'تعديل الوحدة '),
      ]
      : (this.pageTitle = 'إضافة وحدة سكنية جديدة');
    this.cd.markForCheck();
  }
  getEditedData() {
    this.RealStateServices.GetUnitsByID(this.UnitId).subscribe(res => {
      if (res.isSuccess) {
        this.UnitEdited = res.value;
        console.log(res)
        console.log("UnitStatusId" + this.UnitStatusId)

        this.createUnits.patchValue({
          name: this.UnitEdited.name,
          buildingId: this.getBuildingById(this.UnitEdited.building),
          unitStatusId: this.UnitStatusId,
          floorNumber: this.UnitEdited.floorNumber,
          area: this.UnitEdited.area,
          numberOfRooms: this.UnitEdited.numberOfRooms,
          numberOfBatEmployeeooms: this.UnitEdited.numberOfBatEmployeeooms,
          unitTypeId: this.getUnitTypeById(this.UnitEdited.unitType.ar),
          price: this.UnitEdited.price,
          finishingTypeId: this.getFinishById(this.UnitEdited.finishingType.ar),
          hasBalcony: this.UnitEdited.hasBalcony,
          hasGarage: this.UnitEdited.hasGarage,
          hasCentralAC: this.UnitEdited.hasCentralAC,
          description: this.UnitEdited.description,
          OwnershipAgreement: this.UnitEdited.attachments.find(x => x.elementId === 'ownership_agreement')?.attachmentId,
          UnitDiagram: this.UnitEdited.attachments.find(x => x.elementId === 'unit_diagram')?.attachmentId,
          UnitPhotos: this.UnitEdited.attachments.find(x => x.elementId === 'unit_photos')?.attachmentId,
          PreviousUtilityBills: this.UnitEdited.attachments.find(x => x.elementId === 'previous_utility_bills')?.attachmentId,
        });
        this.attachmentsFiles = this.UnitEdited.attachments
        this.cd.markForCheck();
      }
    })

  }

  getBuildingById(name: string) {
    let id = this.DropDownBuildings.find(el => el.name?.includes(name))?.id;
    return id;
  }
  getUnitStatusById(name: string) {
    let id = this.UnitStatus().find(el => el.name == name)?.id;
    return id;
  }
  getFinishById(name: string) {
    let id = this.finishingType().find(el => el.name == name)?.id;
    return id;
  }
  getUnitTypeById(name: string) {
    console.log(name)
    console.log(this.UnitType())
    let id = this.UnitType().find(el => el.name == name)?.id;
    return id;
  }
  editUnit() {
    if (this.createUnits.valid) {
      this.newUnit = {
        ...this.createUnits.value, attachments: this.attachmentsFiles, floorNumber: Number(this.createUnits.value.floorNumber),
        numberOfRooms: Number(this.createUnits.value.numberOfRooms),
        numberOfBatEmployeeooms: Number(this.createUnits.value.numberOfBatEmployeeooms),
        price: Number(this.createUnits.value.price),
        area: Number(this.createUnits.value.area)
      };
      this.RealStateServices.UpdateUnits(this.UnitId, this.newUnit).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم تعديل الوحدة بنجاح' });
            this.createUnits.reset();
            this.GOUnitHome()

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
  GOUnitHome() {
    this.router.navigate(['/real-state-management/units']);
  }
}
