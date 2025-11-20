import { NgForOf, NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './input-select.html',
  styleUrl: './input-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelect),
      multi: true,
    },
  ],
})
export class InputSelect {
  @Input() options: any[]
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string;

  @Output() selectValue = new EventEmitter<any>();
  value: any = '';
  disabled = false;


  ngOnInit(): void {
    this.options = [
      {
        "name": "wess1",
        "id": 1
      },
      {
        "name": "wess3",
        "id": 3
      },
      {
        "name": "4",
        "id": 4
      },
      {
        "name": "5",
        "id": 51
      }
    ]
  }


  writeValue(value: any): void {
    this.value = value ?? '';
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(event: any) {
    console.log(event.target.value)
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.selectValue.emit(value);
  }




}
