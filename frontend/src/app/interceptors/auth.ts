import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, shareReplay, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

let refresh$: Observable<string> | null = null;

const withToken = (req: HttpRequest<unknown>, token: string | null) =>
  token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Login und Refresh selbst nicht anfassen
  if (req.url.includes('/api/token/')) return next(req);

  return next(withToken(req, auth.getAccessToken())).pipe(
    catchError(err => {
      if (!(err instanceof HttpErrorResponse) || err.status !== 401) {
        return throwError(() => err);
      }
      refresh$ ??= auth.refresh().pipe(
        finalize(() => (refresh$ = null)),
        shareReplay(1)
      );
      return refresh$.pipe(
        catchError(e => {
          if (e.status === 401) auth.logout();
          return throwError(() => e);
        }),
        switchMap(token => next(withToken(req, token)))
      );
    })
  );
};