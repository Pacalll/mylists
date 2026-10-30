import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access');
  }

  login(token: string) {
    localStorage.setItem('access', token);
    this.loggedIn.next(true);
  }

  logout() {
    /*
      Clear all caches and remove the access token from localStorage
    */
    caches.keys().then(keys =>
       keys.filter(k => k.includes(':data:')).forEach(k => caches.delete(k))
    );
    localStorage.removeItem('access');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  getAccessToken(): string | null {
  return localStorage.getItem('access');
  }
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
