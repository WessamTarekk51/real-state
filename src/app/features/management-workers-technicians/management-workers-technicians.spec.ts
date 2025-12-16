import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementWorkersTechnicians } from './management-workers-technicians';

describe('ManagementWorkersTechnicians', () => {
  let component: ManagementWorkersTechnicians;
  let fixture: ComponentFixture<ManagementWorkersTechnicians>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementWorkersTechnicians]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementWorkersTechnicians);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
