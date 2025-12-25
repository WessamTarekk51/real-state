import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgIf],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() className: string;
  @Input() buttonTxt: string;
  @Input() iconName: string;

  @Output() buttonClick = new EventEmitter<any>();



  getAction(){
    this.buttonClick.emit()
  }
}
