import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { Button } from "src/app/shared/components/button/button";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";

@Component({
  selector: 'app-create-contract',
  imports: [NgClass, NgFor, InputTxt, InputSelect, InputDate, InputTextArea, Button, InputNum, InputUpload],
  templateUrl: './create-contract.html',
  styleUrl: './create-contract.scss'
})
export class CreateContract {
  buttons: any[];
  activeTab: number = 1;

  ngOnInit(): void {
    this.buttons = [
      {
        name: ' بيانات العقد الأساسية',
        type: 1,
        active: true,
      },
      {
        name: 'تفاصيل الوحدة',
        type: 2,
        active: false,
      },
      {
        name: 'تفاصيل العميل',
        type: 3,
        active: false,
      },
      {
        name: 'خطة الدفع / التقسيط',
        type: 4,
        active: false,
      },
      {
        name: 'المستندات والمرفقات',
        type: 5,
        active: false,
      }
    ];

  }
  toggleButton(button: any) {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    button.active = true;
    this.activeTab = button.type;
  }
  prevTab(){
    this.buttons.forEach((el) => {
      el.active = false;
    });
    this.activeTab -= 1;
    this.buttons[this.activeTab - 1].active = true
  }
  nextTab(){
    this.buttons.forEach((el) => {
      el.active = false;
    });
    this.activeTab += 1;
    this.buttons[this.activeTab - 1].active = true
  }
}
