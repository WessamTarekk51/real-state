import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { RadiosButton } from "src/app/shared/components/radios-button/radios-button";
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-create-user',
  imports: [InputTxt, InputSelect, RadiosButton, Button],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss'
})
export class CreateUser {

}
