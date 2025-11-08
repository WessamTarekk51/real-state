import { Component } from '@angular/core';
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-detailes-land',
  imports: [Button],
  templateUrl: './detailes-land.html',
  styleUrl: './detailes-land.scss'
})
export class DetailesLand {
  pageTitle : string = 'تفاصيل الارض'

}
