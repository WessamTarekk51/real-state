import { Component } from '@angular/core';
import { LoadingServices } from '../../services/loading';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [AsyncPipe],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {
 constructor(public loadingService: LoadingServices){}
}
