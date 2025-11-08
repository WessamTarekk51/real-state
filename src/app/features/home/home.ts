import { Component } from '@angular/core';
import { ContainerColored } from "src/app/shared/components/container-colored/container-colored";

@Component({
  selector: 'app-home',
  imports: [ContainerColored],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  pageTitle : string = 'لوحة التحكم'
}
