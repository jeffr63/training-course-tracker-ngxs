import { Component, input, model, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-navbar',
  imports: [NgbModule, ReactiveFormsModule, RouterLink],
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
        (click)="isNavbarCollapsed.set(!isNavbarCollapsed())">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div [ngbCollapse]="isNavbarCollapsed()" class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <a class="nav-item nav-link active" [routerLink]="['/']">Home</a>
          <a class="nav-item nav-link" [routerLink]="['/courses']">Courses</a>
          @if (isLoggedIn()) { @if (isAdmin()) {
          <a class="nav-item nav-link" [routerLink]="['/admin']">Admin</a>
          }
          <div class="nav-item nav-link" (click)="logout.emit()">Logout</div>
          } @else {
          <div class="nav-item nav-link" (click)="open.emit()">Login</div>
          }
        </div>
      </div>
    </nav>
  `,
  styles: `
    div .nav-item {
      cursor: pointer;
    }
  `,
})
export class MenuNavbarComponent {
  isAdmin = input.required<boolean>();
  isLoggedIn = input.required<boolean>();
  isNavbarCollapsed = model.required<boolean>();
  logout = output();
  open = output();
}
