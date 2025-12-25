import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-create-private-outcome',
  imports: [ReactiveFormsModule, InputSelect, ControlMessages, InputNum, InputDate, InputUpload, InputTextArea, Button],
  templateUrl: './create-private-outcome.html',
  styleUrl: './create-private-outcome.scss'
})
export class CreatePrivateOutcome {
  pageTitle: string = 'إضافة مدفوع خاص';
  createPrivateOutcome!: FormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
  ) {
    this.createPrivateOutcome = this.fb.group({
      x: ['', Validators.required],
    });

  }
}
