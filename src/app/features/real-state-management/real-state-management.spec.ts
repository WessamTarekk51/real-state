import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealStateManagement } from './real-state-management';

describe('RealStateManagement', () => {
  let component: RealStateManagement;
  let fixture: ComponentFixture<RealStateManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealStateManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealStateManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
