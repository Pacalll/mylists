import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { requireGuestGuard } from './requireGuest.guard';

describe('requireGuestGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => requireGuestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
