import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesUnit } from './detailes-unit';

describe('DetailesUnit', () => {
  let component: DetailesUnit;
  let fixture: ComponentFixture<DetailesUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesUnit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
