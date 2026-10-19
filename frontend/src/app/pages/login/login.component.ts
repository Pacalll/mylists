import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';
  isDark = document.body.classList.contains('dark');

  constructor(private auth: AuthService, private router: Router, private api: ApiService) {}

  login() {
    this.api.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.auth.login(res.access);
        this.router.navigate(['/lists']);
      },
      error: () => {
        this.error = 'Login failed. Please try again.';
      }
    });
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    document.body.classList.toggle('light', !this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
}