import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() className: string;
  @Input() buttonTxt: string;
  @Output() buttonClick = new EventEmitter<any>();



  getAction(){
    this.buttonClick.emit()
  }
}
