import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTxt } from './input-txt';

describe('InputTxt', () => {
  let component: InputTxt;
  let fixture: ComponentFixture<InputTxt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTxt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTxt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
