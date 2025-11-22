import { NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-upload',
  imports: [NgIf, NgClass],
  templateUrl: './input-upload.html',
  styleUrl: './input-upload.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUpload),
      multi: true,
    },
  ],
})
export class InputUpload {
  fileName: string | null = null;
  @Input() placeholder: string;
  @Input() formStyle: boolean;
  @Input() required: boolean;
  @Input() labelTxt: string;
  @Output() inputValue = new EventEmitter<any>();
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.value = file;
    this.onChange(file);
    this.onTouched();
    if (
      file.name.toLocaleLowerCase().endsWith('.doc') ||
      file.name.toLocaleLowerCase().endsWith('.pdf') ||
      file.name.toLocaleLowerCase().endsWith('.png') ||
      file.name.toLocaleLowerCase().endsWith('.jpg') ||
      file.name.toLocaleLowerCase().endsWith('.docx') ||
      file.name.toLocaleLowerCase().endsWith('.jpeg')
    ) {
      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('file', file);

        this.inputValue.emit(file);
      }
    }
  }


}
