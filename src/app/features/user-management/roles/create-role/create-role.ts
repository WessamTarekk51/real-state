import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-create-role',
  imports: [InputTxt, Button],
  templateUrl: './create-role.html',
  styleUrl: './create-role.scss'
})
export class CreateRole {
  pageTitle: string = 'انشاء دور جديد';

}
