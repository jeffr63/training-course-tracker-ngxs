import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterModule],

  template: `
    <app-menu></app-menu>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,

  styles: [],
})
export class AppComponent implements OnInit {
  title = "Training Course Tracker";

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLogin();
  }
}
