import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-create-building',
  imports: [InputTxt, InputSelect, InputNum, InputTextArea, InputDate, InputUpload, Button],
  templateUrl: './create-building.html',
  styleUrl: './create-building.scss'
})
export class CreateBuilding {
  pageTitle : string = 'إضافة عمارة جديدة'

}
