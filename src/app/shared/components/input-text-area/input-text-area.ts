import { NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-text-area',
  imports: [NgIf, NgClass],
  templateUrl: './input-text-area.html',
  styleUrl: './input-text-area.scss'
})
export class InputTextArea {
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
