import { TestBed } from '@angular/core/testing';

import { ManagementWorkerServices } from './management-worker-services';

describe('ManagementWorkerServices', () => {
  let service: ManagementWorkerServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementWorkerServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
