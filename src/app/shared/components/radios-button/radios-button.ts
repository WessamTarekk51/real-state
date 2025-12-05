import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radios-button',
  imports: [RadioButtonModule,FormsModule,NgIf],
  templateUrl: './radios-button.html',
  styleUrl: './radios-button.scss',
})
export class RadiosButton {
  ingredient: any;
  @Input() required : boolean;
  @Input() labelTxt : string;
  @Input() valueOne : string;
  @Input() valueTwo : string;
  @Input() radioTxt : string;


}
