import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLocation } from './input-location';

describe('InputLocation', () => {
  let component: InputLocation;
  let fixture: ComponentFixture<InputLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
