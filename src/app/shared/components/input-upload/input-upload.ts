import { NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-upload',
  imports: [NgIf, NgClass],
  templateUrl: './input-upload.html',
  styleUrl: './input-upload.scss'
})
export class InputUpload {
  fileName: string | null = null;
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string
  @Output() inputValue = new EventEmitter<any>();

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }




  getvalue(event: any) {
    let value = event.target.value
    this.inputValue.emit(value)
  }
}
