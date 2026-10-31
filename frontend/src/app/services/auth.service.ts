import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access');
  }

  login(access: string, refresh: string) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  refresh(): Observable<string> {
    return this.http
      .post<{ access: string; refresh?: string }>('/api/token/refresh/', {
        refresh: this.getRefreshToken(),
      })
      .pipe(
        tap(res => {
          localStorage.setItem('access', res.access);
          if (res.refresh) localStorage.setItem('refresh', res.refresh);
        }),
        map(res => res.access)
      );
  }

  isLoggedIn(): boolean { return this.isValid(this.getRefreshToken()); }
  isAccessValid(): boolean { return this.isValid(this.getAccessToken()); }

  private isValid(token: string | null): boolean {
    if (!token) return false;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64)).exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
