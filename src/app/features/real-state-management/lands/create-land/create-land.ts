import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from 'src/app/shared/components/input-num/input-num';
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";
import { Button } from "src/app/shared/components/button/button";
// import { InputLocation } from "src/app/shared/components/input-location/input-location";

@Component({
  selector: 'app-create-land',
  imports: [InputTxt, InputSelect, InputNum, InputTextArea, InputUpload, Button],
  templateUrl: './create-land.html',
  styleUrl: './create-land.scss'
})
export class CreateLand {
  options: any[];
  pageTitle : string = 'إضافة قطعة أرض جديدة'

  ngOnInit(): void {
    this.options = [
      {
        name:"القاهرة"
      },
      {
        name:"اسيوط"
      },
      {
        name:"الجيزة"
      },
      {
        name:"المنوفية"
      }
    ]
  }

  getvalue(event:any){
      console.log(event)
  }
}
