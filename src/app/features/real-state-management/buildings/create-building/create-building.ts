import { ChangeDetectorRef, Component, computed, signal, Signal } from '@angular/core';
import { InputTxt } from 'src/app/shared/components/input-txt/input-txt';
import { InputSelect } from 'src/app/shared/components/input-select/input-select';
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { InputTextArea } from 'src/app/shared/components/input-text-area/input-text-area';
import { InputDate } from 'src/app/shared/components/input-date/input-date';
import { InputUpload } from 'src/app/shared/components/input-upload/input-upload';
import { Button } from 'src/app/shared/components/button/button';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  Validators,
  ReactiveFormsModule,
  UntypedFormGroup,
  UntypedFormControl,
} from '@angular/forms';
import { ControlMessages } from 'src/app/shared/components/control-messages/control-messages';
import { RealStateServices } from '../../real-state-services';
import { forkJoin } from 'rxjs';
import { LookUpItem, RootLookUp } from 'src/app/shared/models/real-state/lookup';
import { NgIf } from '@angular/common';
import { CreateNewBuilding } from 'src/app/shared/models/real-state/building';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { attachment } from 'src/app/shared/models/real-state/attachment';

@Component({
  selector: 'app-create-building',
  imports: [
    InputTxt,
    InputSelect,
    InputNum,
    InputTextArea,
    InputDate,
    InputUpload,
    Button,
    ReactiveFormsModule,
    ControlMessages,
    NgIf,
    ToastModule
  ],
  templateUrl: './create-building.html',
  styleUrl: './create-building.scss',
  providers: [MessageService]
})
export class CreateBuilding {
  pageTitle: string = 'إضافة عمارة جديدة';
  createBuilding!: FormGroup;
  buildingStatus = signal<LookUpItem[]>([]);
  newBuilding: CreateNewBuilding;
  BulidingPermit: string;
  BulidingSafetyCertificate: string;
  BuildingCompletionCertificate: string;
  ArchitecturalAndElectrical: string;

  dataLoaded = computed(
    () =>
      this.buildingStatus().length > 0 &&
      this.BulidingPermit != '' &&
      this.BulidingSafetyCertificate != '' &&
      this.BuildingCompletionCertificate != '' &&
      this.ArchitecturalAndElectrical != ''
  );
  attachmentsFiles: attachment[];

  constructor(private messageService: MessageService, private fb: UntypedFormBuilder, private RealStateServices: RealStateServices,
    private cd: ChangeDetectorRef) {
    this.createBuilding = this.fb.group({
      name: ['', Validators.required],
      landId: ['', Validators.required],
      numberOfFloors: [null, Validators.required],
      numberOfUnits: [null, Validators.required],
      constructionYear: ['', Validators.required],
      buildingStatusId: ['', Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      description: ['', Validators.required],
      BulidingPermit: ['', Validators.required],
      BulidingSafetyCertificate: ['', Validators.required],
      BuildingCompletionCertificate: ['', Validators.required],
      ArchitecturalAndElectrical: ['', Validators.required],
    });
    this.newBuilding = {
      name: '',
      landId: '',
      numberOfFloors: 0,
      numberOfUnits: 0,
      constructionYear: '',
      buildingStatusId: '',
      length: 0,
      width: 0,
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
        elementId: 'buliding_safety_certificate',
        attachmentId: '',
      },
      {
        elementId: 'buliding_completion_certificate',
        attachmentId: '',
      },
      {
        elementId: 'architectural_and_electrical',
        attachmentId: '',
      },
    ];
    this.GetLookUp();
  }
  GetLookUp() {
    console.log(this.attachmentsFiles)
    forkJoin({
      BuildingStatus: this.RealStateServices.GetLookUpSetByCode('building_status'),
      BulidingPermit: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[0].elementId),
      BulidingSafetyCertificate: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[1].elementId),
      BuildingCompletionCertificate: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[2].elementId),
      ArchitecturalAndElectrical: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[3].elementId)
    }).subscribe(({ BuildingStatus, BulidingPermit, BulidingSafetyCertificate, BuildingCompletionCertificate, ArchitecturalAndElectrical }) => {
      if (BuildingStatus?.isSuccess) {
        const mapped = BuildingStatus.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.buildingStatus.set(mapped);
      }
      if (BulidingPermit?.isSuccess) {
        this.BulidingPermit = BulidingPermit.value.id
        this.attachmentsFiles[0].attachmentId = this.BulidingPermit
      }
      if (BulidingSafetyCertificate?.isSuccess) {
        this.BulidingSafetyCertificate = BulidingSafetyCertificate.value.id
        this.attachmentsFiles[1].attachmentId = this.BulidingPermit

      }
      if (BuildingCompletionCertificate?.isSuccess) {
        this.BuildingCompletionCertificate = BuildingCompletionCertificate.value.id
        this.attachmentsFiles[2].attachmentId = this.BulidingPermit

      }
      if (ArchitecturalAndElectrical?.isSuccess) {
        this.ArchitecturalAndElectrical = ArchitecturalAndElectrical.value.id
        this.attachmentsFiles[3].attachmentId = this.BulidingPermit
      }
      console.log(this.BulidingPermit)
    });
  }


  createNewBuilding() {
    console.log(this.createBuilding)
    if (this.createBuilding.valid) {
      this.newBuilding = { ...this.createBuilding.value, attachments: this.attachmentsFiles };
      this.RealStateServices.CreateBuildings(this.newBuilding).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء العمارة بنجاح' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
      this.createBuilding.reset();
    } else {
      this.validateAllFields(this.createBuilding);
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




}
