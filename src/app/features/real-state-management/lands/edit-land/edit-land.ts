import { ChangeDetectorRef, Component } from '@angular/core';
import { CreateLand } from "../create-land/create-land";
import { LandDetailes } from 'src/app/shared/models/real-state/land';
import { ActivatedRoute } from '@angular/router';
import { RealStateServices } from '../../real-state-services';

@Component({
  selector: 'app-edit-land',
  imports: [CreateLand],
  templateUrl: './edit-land.html',
  styleUrl: './edit-land.scss'
})
export class EditLand {
  pageTitle: string = 'تعديل قطعة أرض'
  landId: string;
  landDetailes: LandDetailes
  constructor(private activatedRoute: ActivatedRoute, private RealStateServices :RealStateServices,private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.landId = String(this.activatedRoute.snapshot.queryParamMap.get('id'))
    this.getLandDetailes()

  }


  getLandDetailes() {
    this.RealStateServices.GetLandsByID(this.landId).subscribe(res => {
      if (res.isSuccess) {
        this.landDetailes = res.value
        this.cd.markForCheck();
      }
    })
  }
}
