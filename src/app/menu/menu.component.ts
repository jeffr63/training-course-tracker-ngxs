import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@services/auth/auth.service';
import { LoginComponent } from '@modals/login.component';
import { MenuNavbarComponent } from './menu-navbar.component';

@Component({
  selector: 'app-menu',
  imports: [MenuNavbarComponent],
  template: `
    <app-menu-navbar
      [isAdmin]="isAdmin()"
      [isLoggedIn]="isLoggedIn()"
      [(isNavbarCollapsed)]="isNavbarCollapsed"
      (logout)="logout()"
      (open)="open()" />
  `,
})
export class MenuComponent {
  readonly #auth = inject(AuthService);
  readonly #modalService = inject(NgbModal);
  readonly #router = inject(Router);

  isAdmin = this.#auth.isLoggedInAsAdmin;
  isLoggedIn = this.#auth.isLoggedIn;
  isNavbarCollapsed = signal(false);

  protected logout() {
    this.#auth.logout();
    this.#router.navigate(['/']);
  }

  protected open() {
    this.#modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.#auth.login(result.email, result.password).subscribe();
      }
    });
  }
}
