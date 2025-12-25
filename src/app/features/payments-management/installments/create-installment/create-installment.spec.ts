import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstallment } from './create-installment';

describe('CreateInstallment', () => {
  let component: CreateInstallment;
  let fixture: ComponentFixture<CreateInstallment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstallment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInstallment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
