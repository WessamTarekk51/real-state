import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  imports: [NgClass, NgIf],
  templateUrl: './input-date.html',
  styleUrl: './input-date.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDate),
      multi: true,
    },
  ],
})
export class InputDate {
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string
  @Output() inputValue = new EventEmitter<any>();
  inputType: string = 'text';
  value: any = '';
  disabled = false;
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

  onFocus(input: HTMLInputElement) {
    this.inputType = 'date';

    // ننتظر قليلاً ثم نفتح التقويم تلقائيًا
    setTimeout(() => {
      if (input.showPicker) {
        input.showPicker(); // مدعوم في Chrome
      } else {
        input.click(); // خطة بديلة
      }
    }, 50);
  }
  onBlur(input: HTMLInputElement) {
    // إذا ما تم اختيار شيء، نرجع للحالة النصية
    if (!input.value) {
      this.inputType = 'text';
    }
  }
  getvalue(event: any) {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.inputValue.emit(value)
  }

}
