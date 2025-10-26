import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-date',
  imports: [],
  templateUrl: './input-date.html',
  styleUrl: './input-date.scss'
})
export class InputDate {
  @Input() placeholder: string;
  @Output() inputValue = new EventEmitter<any>();
  inputType: string = 'text';


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
    console.log(event)
    let value = event.target.value
    console.log(value)

    this.inputValue.emit(value)
  }
}
