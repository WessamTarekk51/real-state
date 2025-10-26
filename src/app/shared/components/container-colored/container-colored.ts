import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-container-colored',
  imports: [],
  templateUrl: './container-colored.html',
  styleUrl: './container-colored.scss'
})
export class ContainerColored {
 @Input() txt : string;
 @Input() numTxt : string;
 @Input() color : string;

}
