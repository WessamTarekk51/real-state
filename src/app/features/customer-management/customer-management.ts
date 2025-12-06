import { Component } from '@angular/core';
import { ContainerColored } from "src/app/shared/components/container-colored/container-colored";

@Component({
  selector: 'app-customer-management',
  imports: [ContainerColored],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss'
})
export class CustomerManagement {
  pageTitle : string = 'إدارة العملاء'

}
