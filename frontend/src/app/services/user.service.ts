import { Injectable } from '@angular/core';
import { JwtPayload } from '../jwt-payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  private get payload(): JwtPayload | null {
    const token = localStorage.getItem('access');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

  getUserId(): number | null {
    return this.payload ? Number(this.payload.user_id) : null;
  }

  getUsername(): string | null {
    return this.payload?.username ?? null;
  }
}
