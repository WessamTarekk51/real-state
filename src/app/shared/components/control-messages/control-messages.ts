import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-messages',
  imports: [NgIf,NgFor],
  templateUrl: './control-messages.html',
  styleUrl: './control-messages.scss'
})
export class ControlMessages {
  @Input() control: AbstractControl | null = null;
  @Input() validationMessages: { type: string; message: string }[] = [];
}
