import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputNum } from 'src/app/shared/components/input-num/input-num';

@Component({
  selector: 'app-create-land',
  imports: [InputTxt, InputSelect,InputNum],
  templateUrl: './create-land.html',
  styleUrl: './create-land.scss'
})
export class CreateLand {
  options: any[];

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
