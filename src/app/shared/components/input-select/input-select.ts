import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-select',
  imports: [NgForOf],
  templateUrl: './input-select.html',
  styleUrl: './input-select.scss'
})
export class InputSelect {
  @Input() options: any[]
  @Input() placeholder: string;
  @Output() selectValue = new EventEmitter<any>();



  getvalue(event: any) {
    let value = event.target.value;
    this.selectValue.emit(value)
  }
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
}
