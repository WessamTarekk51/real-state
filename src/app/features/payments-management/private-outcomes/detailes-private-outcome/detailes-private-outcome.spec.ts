import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesPrivateOutcome } from './detailes-private-outcome';

describe('DetailesPrivateOutcome', () => {
  let component: DetailesPrivateOutcome;
  let fixture: ComponentFixture<DetailesPrivateOutcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesPrivateOutcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesPrivateOutcome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
