import { NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputTxt } from "src/app/shared/components/input-txt/input-txt";
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { Button } from "src/app/shared/components/button/button";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";
import { FormArray, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { forkJoin } from 'rxjs';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';

@Component({
  selector: 'app-create-contract',
  imports: [ReactiveFormsModule, NgClass, NgFor, InputTxt, InputSelect, InputDate, InputTextArea, Button, InputNum, InputUpload, ControlMessages],
  templateUrl: './create-contract.html',
  styleUrl: './create-contract.scss'
})
export class CreateContract {
  buttons: any[];
  activeTab: number = 1;
  createContract!: FormGroup;
  contractTypes = signal<LookUpItem[]>([]);
  unitTypes = signal<LookUpItem[]>([]);
  DropDownLands: DropDownLands[];
  DropDownBuildings: DropDownBuildings[];
  DropDownUnits: DropDownUnits[];

  constructor(private fb: UntypedFormBuilder, private RealStateServices: RealStateServices) {
    this.createContract = this.fb.group({
      contractName: ['', Validators.required],
      contractNumber: ['', Validators.required],
      contractTypeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      notes: [''],
      totalPrice: ['', Validators.required],
      downPayment: ['', Validators.required],
      paymentMethodId: ['', Validators.required],
      landId: ['', Validators.required],
      buildingId: ['', Validators.required],
      unitId: ['', Validators.required],
      unitArea: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitType: ['', Validators.required],
      floorNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      clientNationalId: ['', Validators.required],
      clientEmail: ['', Validators.required],
      clientPhone: ['', Validators.required],
      isInstallmentPlan: ['', Validators.required],
      installmentAmount: ['', Validators.required],
      installmentCount: ['', Validators.required],
      firstPaymentDate: ['', Validators.required],
      frequency: ['', Validators.required],
      propertyContract: ['', Validators.required],
    });
  }

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
    this.GetLookUp();
  }
  GetLookUp() {
    forkJoin({
      getDropDownLands: this.RealStateServices.getDropDownLands(),
      getDropDownBuilding: this.RealStateServices.getDropDownBuildings(),
      getDropDownUnit: this.RealStateServices.getDropDownUnits(),
      contractTypes: this.RealStateServices.GetLookUpSetByCode('contract_type'),
      unitTypes: this.RealStateServices.GetLookUpSetByCode('unit_type'),

    }).subscribe(({ getDropDownLands, getDropDownBuilding, getDropDownUnit, contractTypes, unitTypes }) => {
      if (contractTypes?.isSuccess) {
        const mapped = contractTypes.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.contractTypes.set(mapped);
      }
      if (unitTypes?.isSuccess) {
        const mapped = unitTypes.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.unitTypes.set(mapped);
      }
      if (getDropDownLands.isSuccess) {
        this.DropDownLands = getDropDownLands.value;
      }
      if (getDropDownBuilding.isSuccess) {
        this.DropDownBuildings = getDropDownBuilding.value;
      }
      if (getDropDownUnit.isSuccess) {
        this.DropDownUnits = getDropDownUnit.value;
      }
    });
  }
  toggleButton(button: any) {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    button.active = true;
    this.activeTab = button.type;
  }
  prevTab() {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    this.activeTab -= 1;
    this.buttons[this.activeTab - 1].active = true
  }
  nextTab() {
    this.buttons.forEach((el) => {
      el.active = false;
    });
    this.activeTab += 1;
    this.buttons[this.activeTab - 1].active = true
  }

}
