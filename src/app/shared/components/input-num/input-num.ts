import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-num',
  imports: [NgClass,NgIf],
  templateUrl: './input-num.html',
  styleUrl: './input-num.scss'
})
export class InputNum {
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string
  @Output() inputValue = new EventEmitter<any>();



  getvalue(event: any) {
    let value = event.target.value
    this.inputValue.emit(value)
  }
}
