import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutcome } from './create-outcome';

describe('CreateOutcome', () => {
  let component: CreateOutcome;
  let fixture: ComponentFixture<CreateOutcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOutcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOutcome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
