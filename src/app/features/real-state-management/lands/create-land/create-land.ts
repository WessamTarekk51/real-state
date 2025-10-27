import { Component } from '@angular/core';

@Component({
  selector: 'app-create-land',
  imports: [],
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
