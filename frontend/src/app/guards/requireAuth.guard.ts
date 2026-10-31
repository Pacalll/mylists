import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const requireAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) return router.createUrlTree(['/']);
  if (auth.isAccessValid()) return true;

  return auth.refresh().pipe(
    map(() => true),
    catchError(e => {
      if (e.status === 401) { auth.logout(); return of(false); }
      return of(true);
    })
  );
};