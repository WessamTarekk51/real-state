import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesIncome } from './detailes-income';

describe('DetailesIncome', () => {
  let component: DetailesIncome;
  let fixture: ComponentFixture<DetailesIncome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesIncome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesIncome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
