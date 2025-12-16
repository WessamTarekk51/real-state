import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncome } from './create-income';

describe('CreateIncome', () => {
  let component: CreateIncome;
  let fixture: ComponentFixture<CreateIncome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIncome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIncome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
