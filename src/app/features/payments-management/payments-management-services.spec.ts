import { TestBed } from '@angular/core/testing';

import { PaymentsManagementServices } from './payments-management-services';

describe('PaymentsManagementServices', () => {
  let service: PaymentsManagementServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsManagementServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
