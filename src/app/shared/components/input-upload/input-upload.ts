import { NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-upload',
  imports: [NgIf, NgClass],
  templateUrl: './input-upload.html',
  styleUrl: './input-upload.scss',
})
export class InputUpload {
  fileName: string | null = null;
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string;
  @Output() inputValue = new EventEmitter<any>();

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (
      file.name.toLocaleLowerCase().endsWith('.doc') ||
      file.name.toLocaleLowerCase().endsWith('.pdf') ||
      file.name.toLocaleLowerCase().endsWith('.png') ||
      file.name.toLocaleLowerCase().endsWith('.jpg') ||
      file.name.toLocaleLowerCase().endsWith('.docx') ||
      file.name.toLocaleLowerCase().endsWith('.jpeg')
    ) {
      if (file) {
        if (file.size < 5242880) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append('file', file);
          console.log(formData);
          this.inputValue.emit(formData);

        }
      }
    }
  }


}
