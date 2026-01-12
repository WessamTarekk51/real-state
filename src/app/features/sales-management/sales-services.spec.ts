import { TestBed } from '@angular/core/testing';

import { SalesServices } from './sales-services';

describe('SalesServices', () => {
  let service: SalesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
