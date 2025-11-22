import { NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text-area',
  imports: [NgIf, NgClass],
  templateUrl: './input-text-area.html',
  styleUrl: './input-text-area.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextArea),
      multi: true,
    },
  ],
})
export class InputTextArea {
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string
  @Output() inputValue = new EventEmitter<any>();
  value: any = '';
  disabled = false;
  writeValue(value: any): void {
    this.value = value ?? '';
  }

  onChange: any = () => {};
  onTouched: any = () => {};

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
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.inputValue.emit(value);
  }

}
