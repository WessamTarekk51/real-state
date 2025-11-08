import { Component } from '@angular/core';
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-detailes-building',
  imports: [Button],
  templateUrl: './detailes-building.html',
  styleUrl: './detailes-building.scss'
})
export class DetailesBuilding {
   pageTitle : string ='تفاصيل العمارة'
}
