import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { PaymentsManagementServices } from '../../payments-management-services';
import { RealStateServices } from 'src/app/features/real-state-management/real-state-services';
import { forkJoin } from 'rxjs';
import { DropDownLands } from 'src/app/shared/models/real-state/land';
import { DropDownBuildings } from 'src/app/shared/models/real-state/building';
import { DropDownUnits } from 'src/app/shared/models/real-state/unit';
import { LookUpItem } from 'src/app/shared/models/real-state/lookup';
import { InputSelect } from "src/app/shared/components/input-select/input-select";
import { ControlMessages } from "src/app/shared/components/control-messages/control-messages";
import { InputNum } from "src/app/shared/components/input-num/input-num";
import { InputDate } from "src/app/shared/components/input-date/input-date";
import { InputUpload } from "src/app/shared/components/input-upload/input-upload";
import { InputTextArea } from "src/app/shared/components/input-text-area/input-text-area";
import { Button } from "src/app/shared/components/button/button";

@Component({
  selector: 'app-create-income',
  imports: [ReactiveFormsModule, InputSelect, ControlMessages, InputNum, InputDate, InputUpload, InputTextArea, Button],
  templateUrl: './create-income.html',
  styleUrl: './create-income.scss'
})
export class CreateIncome {
  pageTitle: string = 'إضافة مدفوع وارد';
  createIncome!: FormGroup;
  DropDownLands: DropDownLands[];
  DropDownBuildings: DropDownBuildings[];
  DropDownUnits: DropDownUnits[];
  transactionTypes = signal<LookUpItem[]>([]);
  paymentMethods = signal<LookUpItem[]>([]);

  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private PaymentsManagementServices: PaymentsManagementServices,
    private RealStateServices: RealStateServices
  ) {
    this.createIncome = this.fb.group({
      contractId: ['', Validators.required],
      contractInstallmentId: ['', Validators.required],
      clientId: ['', Validators.required],
      transactionTypeId: ['', Validators.required],
      amount: ['', Validators.required],
      paymentMethodId: ['', Validators.required],
      paymentDate: ['', Validators.required],
      notes: [''],
      receipt: ['', Validators.required]
    });

  }
  ngOnInit(): void {
    this.GetLookUp();
  }
  GetLookUp() {
    forkJoin({
      getDropDownLands: this.RealStateServices.getDropDownLands(),
      getDropDownBuilding: this.RealStateServices.getDropDownBuildings(),
      getDropDownUnit: this.RealStateServices.getDropDownUnits(),
      transactionTypes: this.RealStateServices.GetLookUpSetByCode('transaction_type'),
      paymentMethods: this.RealStateServices.GetLookUpSetByCode('payment_method')
    }).subscribe(({ getDropDownLands, getDropDownBuilding, getDropDownUnit, transactionTypes,paymentMethods }) => {
      if (getDropDownLands.isSuccess) {
        this.DropDownLands = getDropDownLands.value;
      }
      if (getDropDownBuilding.isSuccess) {
        this.DropDownBuildings = getDropDownBuilding.value;
      }
      if (getDropDownUnit.isSuccess) {
        this.DropDownUnits = getDropDownUnit.value;
      }
      if (transactionTypes?.isSuccess) {
        const mapped = transactionTypes.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.transactionTypes.set(mapped);
      }
       if (paymentMethods?.isSuccess) {
        const mapped = paymentMethods.value.items.map((el) => ({
          ...el,
          name: el.descriptions.ar,
        }));
        this.paymentMethods.set(mapped);
      }
    });
  }
}

