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
import { BuildingDetailes, CreateNewBuilding } from 'src/app/shared/models/real-state/building';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { attachment } from 'src/app/shared/models/real-state/attachment';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { ActivatedRoute, Router } from '@angular/router';

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
  attachmentsFiles: attachment[];

  buildingStatus = signal<LookUpItem[]>([]);
  dataLoaded: boolean = false;
  newBuilding: CreateNewBuilding;
  BulidingPermit: string;
  BulidingSafetyCertificate: string;
  BuildingCompletionCertificate: string;
  ArchitecturalAndElectrical: string;

  DropDownLands: DropDownLands[]

  BuildingEdited: BuildingDetailes;
  BuildingId: string;
  edit: boolean = false;
  photos: any[] = ["photo1", "photo2", "photo3", "photo4"];

  constructor(private messageService: MessageService, private fb: UntypedFormBuilder, private RealStateServices: RealStateServices, private router: Router
    , private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
    this.createBuilding = this.fb.group({
      name: ['', Validators.required],
      landId: ['', Validators.required],
      numberOfFloors: [null, Validators.required],
      numberOfUnits: [null, Validators.required],
      constructionYear: ['', Validators.required],
      buildingStatusId: ['', Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      description: [''],
      BulidingPermit: ['', Validators.required],
      BulidingSafetyCertificate: ['', Validators.required],
      BuildingCompletionCertificate: ['', Validators.required],
      ArchitecturalAndElectrical: ['', Validators.required],
      area: ['']
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
    forkJoin({
      BuildingStatus: this.RealStateServices.GetLookUpSetByCode('building_status'),
      BulidingPermit: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[0].elementId),
      BulidingSafetyCertificate: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[1].elementId),
      BuildingCompletionCertificate: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[2].elementId),
      ArchitecturalAndElectrical: this.RealStateServices.GetLookUpItemByCode('attachment_type', this.attachmentsFiles[3].elementId),
      getDropDownLands: this.RealStateServices.getDropDownLands()
    }).subscribe(({ BuildingStatus, BulidingPermit, BulidingSafetyCertificate, BuildingCompletionCertificate, ArchitecturalAndElectrical, getDropDownLands }) => {
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
      if (getDropDownLands.isSuccess) {
        this.DropDownLands = getDropDownLands.value;
      }
      this.isEditRoute();
      this.dataLoaded = true
    });
  }


  createNewBuilding() {
    console.log(this.createBuilding)
    if (this.createBuilding.valid) {
      this.newBuilding = {
        ...this.createBuilding.value, length: Number(this.createBuilding.value.length),
        width: Number(this.createBuilding.value.width), numberOfFloors: Number(this.createBuilding.value.numberOfFloors), numberOfUnits: Number(this.createBuilding.value.numberOfUnits), attachments: this.attachmentsFiles
      };
      this.RealStateServices.CreateBuildings(this.newBuilding).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم إنشاء العمارة بنجاح' });
            this.createBuilding.reset();
            this.GOLandHome()

          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
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


  getcaluArea(length: any) {
    this.createBuilding.value.width != null && this.createBuilding.value.length ? this.getArea() : ''
  }

  getArea() {
    this.createBuilding.patchValue({
      area: this.createBuilding.value.width * this.createBuilding.value.length
    });
  }


  isEditRoute() {
    this.edit = this.router.url.includes('edit');
    this.edit
      ? [
        (this.BuildingId = String(
          this.activatedRoute.snapshot.queryParamMap.get('id')
        )),
        this.getEditedData(),
        this.photos = ["photo1", "photo2", "photo3", "photo4"],
        (this.pageTitle = 'تعديل العمارة '),
      ]
      : (this.pageTitle = 'إضافة عمارة جديدة');
    this.cd.markForCheck();
  }
  getEditedData() {
    this.RealStateServices.GetBuildingsByID(this.BuildingId).subscribe(res => {
      if (res.isSuccess) {
        this.BuildingEdited = res.value;
        console.log(this.BuildingEdited)
        this.createBuilding.patchValue({
          name: this.BuildingEdited.name,
          landId: this.getLandById(this.BuildingEdited.landName),
          numberOfFloors: this.BuildingEdited.numberOfFloors,
          numberOfUnits: this.BuildingEdited.numberOfUnits,
          constructionYear: this.BuildingEdited.constructionYear.substring(0, 10),
          buildingStatusId: this.getStatuesById(this.BuildingEdited.buildingStatus.ar),
          length: this.BuildingEdited.length,
          width: this.BuildingEdited.width,
          description: this.BuildingEdited.description,
          area: this.BuildingEdited.length * this.BuildingEdited.width,
          BulidingPermit: this.BuildingEdited.attachments.find(x => x.elementId === 'buliding_permit')?.attachmentId,
          BulidingSafetyCertificate: this.BuildingEdited.attachments.find(x => x.elementId === 'buliding_safety_certificate')?.attachmentId,
          BuildingCompletionCertificate: this.BuildingEdited.attachments.find(x => x.elementId === 'buliding_completion_certificate')?.attachmentId,
          ArchitecturalAndElectrical: this.BuildingEdited.attachments.find(x => x.elementId === 'architectural_and_electrical')?.attachmentId
        });
        this.attachmentsFiles = this.BuildingEdited.attachments
        this.cd.markForCheck();
      }
    })

  }
  getStatuesById(name: string) {
    let id = this.buildingStatus().find(el => el.name == name)?.id;
    return id;
  }
  getLandById(name: string) {
    console.log(this.DropDownLands)
    let id = this.DropDownLands.find(el => el.name?.includes(name))?.id;
    return id;
  }

  editBuilding() {
    if (this.createBuilding.valid) {
      this.newBuilding = {
        ...this.createBuilding.value, length: Number(this.createBuilding.value.length),
        width: Number(this.createBuilding.value.width), numberOfFloors: Number(this.createBuilding.value.numberOfFloors), numberOfUnits: Number(this.createBuilding.value.numberOfUnits), attachments: this.attachmentsFiles
      };
      this.RealStateServices.UpdateBuildings(this.BuildingId,this.newBuilding).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'تم تعديل العمارة بنجاح' });
            this.createBuilding.reset();
            this.GOLandHome()

          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حاول مرة أخري.' });
        }
      );
    } else {
      this.validateAllFields(this.createBuilding);
    }
  }

  GOLandHome() {
    this.router.navigate(['/real-state-management/builings']);
  }

}
