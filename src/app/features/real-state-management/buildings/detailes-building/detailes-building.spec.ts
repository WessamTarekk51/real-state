import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesBuilding } from './detailes-building';

describe('DetailesBuilding', () => {
  let component: DetailesBuilding;
  let fixture: ComponentFixture<DetailesBuilding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesBuilding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesBuilding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
