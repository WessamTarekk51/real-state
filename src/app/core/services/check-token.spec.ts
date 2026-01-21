import { TestBed } from '@angular/core/testing';

import { CheckToken } from './check-token';

describe('CheckToken', () => {
  let service: CheckToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
