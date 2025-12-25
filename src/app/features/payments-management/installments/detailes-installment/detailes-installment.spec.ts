import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesInstallment } from './detailes-installment';

describe('DetailesInstallment', () => {
  let component: DetailesInstallment;
  let fixture: ComponentFixture<DetailesInstallment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesInstallment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesInstallment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
