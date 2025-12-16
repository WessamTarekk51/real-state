import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsManagement } from './payments-management';

describe('PaymentsManagement', () => {
  let component: PaymentsManagement;
  let fixture: ComponentFixture<PaymentsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
