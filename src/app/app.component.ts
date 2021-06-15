import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: "app-root",

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

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.auth.renewTokens();
    }
  }
}
