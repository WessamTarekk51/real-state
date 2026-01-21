import { TestBed } from '@angular/core/testing';

import { AccountSevices } from './account-sevices';

describe('AccountSevices', () => {
  let service: AccountSevices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSevices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
