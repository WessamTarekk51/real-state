import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-create-installment',
  imports: [ReactiveFormsModule, InputSelect, ControlMessages, InputNum, InputDate, InputTextArea, Button],
  templateUrl: './create-installment.html',
  styleUrl: './create-installment.scss'
})
export class CreateInstallment {
  pageTitle: string = 'إضافة قسط';
  createInstallment!: FormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
  ) {
    this.createInstallment = this.fb.group({
      x: ['', Validators.required],
    });

  }
}
