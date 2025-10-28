import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNum } from './input-num';

describe('InputNum', () => {
  let component: InputNum;
  let fixture: ComponentFixture<InputNum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputNum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
