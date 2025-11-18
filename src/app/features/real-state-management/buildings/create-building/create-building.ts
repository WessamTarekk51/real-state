import { Component } from '@angular/core';
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
  UntypedFormControl
} from '@angular/forms';
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";

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
    ControlMessages
],
  templateUrl: './create-building.html',
  styleUrl: './create-building.scss',
})
export class CreateBuilding {
  pageTitle: string = 'إضافة عمارة جديدة';
  createBuilding!: FormGroup;

  constructor(private fb: UntypedFormBuilder) {
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
      attachments: this.fb.array([], Validators.required),
    });
  }



  get attachmentsArray() {
    return this.createBuilding.get('attachments') as FormArray;
  }

  addAttachment(attachment: any) {
    this.attachmentsArray.push(this.fb.group(attachment));
  }
  validateAllFields(formGroup: UntypedFormGroup) {
    console.log(formGroup)
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field)
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true })
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFields(control)
      }
    })
  }
}
