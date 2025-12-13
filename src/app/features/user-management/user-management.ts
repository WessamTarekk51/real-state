import { ChangeDetectorRef, Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ContainerColored } from "src/app/shared/components/container-colored/container-colored";

@Component({
  selector: 'app-user-management',
  imports: [ContainerColored,ChartModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss'
})
export class UserManagement {
  data: any;
  options: any;
  pageTitle : string = 'إدارة المستخدمين'

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
