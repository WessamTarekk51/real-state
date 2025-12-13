import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerManagementServices } from '../../customer-management-services';
import { ClientDetailes } from 'src/app/shared/models/customer/client';
import { Button } from "src/app/shared/components/button/button";
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-detailes-client',
  imports: [Button,NgFor,NgClass],
  templateUrl: './detailes-client.html',
  styleUrl: './detailes-client.scss'
})
export class DetailesClient {
  pageTitle: string = 'تفاصيل العميل'
  clientId: string;
  clientDetailes : ClientDetailes;
  buttons: any[];
  activeTab: number = 1;

  constructor(private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private CustomerManagementServices: CustomerManagementServices, private router: Router) {
    //
  }
  ngOnInit(): void {
    this.clientId = String(this.activatedRoute.snapshot.queryParamMap.get('id'))
    this.getClientDetailes();
    this.buttons = [
      {
        name: ' الوحدات المملوكة',
        type: 1,
        active: true,
      },
      {
        name: 'تفاصيل الدفع / الأقساط',
        type: 2,
        active: false,
      },
    ];
  }

  getClientDetailes(){
    this.CustomerManagementServices.GetClientByID(this.clientId).subscribe(res => {
      console.log(res)
      if (res.isSuccess) {
        this.clientDetailes = res.value
        console.log(this.clientDetailes)
        this.cd.markForCheck();
      }
    })
  }
  toggleButton(button: any) {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    button.active = true;
    this.activeTab = button.type;
  }
}
