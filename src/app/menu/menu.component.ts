import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../shared/services/auth.service';
import { LoginComponent } from '../shared/modals/login.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, NgbModule, ReactiveFormsModule, RouterLink],

  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" [routerLink]="['/']">Training Courses Tracker (with Ngxs)</a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        (click)="isNavbarCollapsed = !isNavbarCollapsed"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div [ngbCollapse]="isNavbarCollapsed" class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <a class="nav-item nav-link active" [routerLink]="['/']">Home</a>
          <a class="nav-item nav-link" [routerLink]="['/courses']">Courses</a>
          <div *ngIf="!auth.isAuthenticated" class="nav-item nav-link" (click)="open()">Login</div>
          <a *ngIf="auth.isAuthenticated && auth.isAdmin" class="nav-item nav-link" [routerLink]="['/admin']">Admin</a>
          <div *ngIf="auth.isAuthenticated" class="nav-item nav-link" (click)="logout()">Logout</div>
        </div>
      </div>
    </nav>
  `,

  styles: [
    `
      div .nav-item {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  auth = inject(AuthService);
  modalService = inject(NgbModal);
  router = inject(Router);

  public isNavbarCollapsed = true;

  open() {
    this.modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.auth.login(result.email, result.password).subscribe();
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
