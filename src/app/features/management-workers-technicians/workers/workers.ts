import { Component } from '@angular/core';

@Component({
  selector: 'app-workers',
  imports: [],
  templateUrl: './workers.html',
  styleUrl: './workers.scss'
})
export class Workers {
  filters = {
    Phone: '',
    Name: '',
    DistrictId: '',
    ConstructionDate: '',
    Area: '',
    BuildingCount: ''
  };
  getFilter(num: any) {
    // this.getLands()
  }
}
