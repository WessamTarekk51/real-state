import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-create-client',
  imports: [ReactiveFormsModule, InputTxt, ControlMessages, Button],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss'
})
export class CreateClient {
  createClient!: FormGroup;

  constructor(private fb: UntypedFormBuilder){
    this.createClient = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: [''],
      nationalId: ['', Validators.required],
      address: [''],
    });
  }

}
