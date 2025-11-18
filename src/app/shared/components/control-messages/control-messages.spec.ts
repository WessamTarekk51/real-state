import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMessages } from './control-messages';

describe('ControlMessages', () => {
  let component: ControlMessages;
  let fixture: ComponentFixture<ControlMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
