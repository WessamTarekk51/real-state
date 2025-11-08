import {ChangeDetectorRef, Component } from '@angular/core';
import { ContainerColored } from "src/app/shared/components/container-colored/container-colored";
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-real-state-management',
  imports: [ContainerColored, ChartModule],
  templateUrl: './real-state-management.html',
  styleUrl: './real-state-management.scss'
})
export class RealStateManagement {
  data: any;
  options: any;
  pageTitle : string = 'إدارة العقارات'

  constructor(private cd : ChangeDetectorRef) { }


  ngOnInit() {
    this.initChart();
  }
  initChart() {
    this.data = {
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: ['rgba(1, 162, 80, 1)','rgba(236, 98, 13, 1)', 'rgba(221, 43, 46, 1)'],
        }
      ]
    };

    this.cd.markForCheck()
  }
}
