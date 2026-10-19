import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.classList.add(saved);
  }
}