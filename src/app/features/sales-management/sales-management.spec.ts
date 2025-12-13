import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManagement } from './sales-management';

describe('SalesManagement', () => {
  let component: SalesManagement;
  let fixture: ComponentFixture<SalesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
