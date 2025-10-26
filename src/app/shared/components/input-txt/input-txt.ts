import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-input-txt',
  imports: [],
  templateUrl: './input-txt.html',
  styleUrl: './input-txt.scss'
})
export class InputTxt {
  @Input() placeholder: string;
  @Output() inputValue = new EventEmitter<any>();



  getvalue(event:any) {
    let value = event.target.value
    this.inputValue.emit(value)
  }
}
