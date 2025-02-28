import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './shared/services/auth/auth.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, RouterOutlet],
  template: `
    <app-menu></app-menu>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  readonly #authService = inject(AuthService);

  ngOnInit() {
    this.#authService.checkLogin();
  }
}
