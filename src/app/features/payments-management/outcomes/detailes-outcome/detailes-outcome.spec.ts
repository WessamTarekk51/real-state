import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesOutcome } from './detailes-outcome';

describe('DetailesOutcome', () => {
  let component: DetailesOutcome;
  let fixture: ComponentFixture<DetailesOutcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesOutcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesOutcome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
