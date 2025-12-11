import { NgIf } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radios-button',
  imports: [RadioButtonModule, NgIf,FormsModule],
  templateUrl: './radios-button.html',
  styleUrl: './radios-button.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiosButton),
      multi: true,
    },
  ],
})
export class RadiosButton implements ControlValueAccessor {
  @Input() required: boolean;
  @Input() labelTxt: string;
  @Input() valueOne: string = 'نعم';
  @Input() valueTwo: string = 'لا';
  @Input() radioTxt: string;

  value: boolean | null = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val: boolean) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}
