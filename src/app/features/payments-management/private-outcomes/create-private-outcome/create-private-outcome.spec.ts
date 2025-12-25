import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrivateOutcome } from './create-private-outcome';

describe('CreatePrivateOutcome', () => {
  let component: CreatePrivateOutcome;
  let fixture: ComponentFixture<CreatePrivateOutcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrivateOutcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrivateOutcome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
