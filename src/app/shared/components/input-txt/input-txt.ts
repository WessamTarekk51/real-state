import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-txt',
  imports: [NgClass, NgIf],
  templateUrl: './input-txt.html',
  styleUrl: './input-txt.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTxt),
      multi: true,
    },
  ],
})
export class InputTxt {
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string;
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

  // When the user types
  updateValue(event: any) {
    const value = event.target.value;

    this.value = value;
    this.onChange(value);
    this.onTouched();
    console.log(value);
    this.inputValue.emit(value);
  }
}
