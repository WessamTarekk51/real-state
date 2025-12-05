import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiosButton } from './radios-button';

describe('RadiosButton', () => {
  let component: RadiosButton;
  let fixture: ComponentFixture<RadiosButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiosButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiosButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
