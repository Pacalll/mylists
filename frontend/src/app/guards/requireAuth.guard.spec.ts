import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { requireAuthGuard } from './requireAuth.guard';

describe('requireAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => requireAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
