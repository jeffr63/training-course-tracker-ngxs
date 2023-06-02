import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplayComponent } from '../shared/components/list-display.component';
import { ListHeaderComponent } from '../shared/components/list-header.component';
import { UsersFacade } from '../shared/facades/users.facade';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AsyncPipe, NgbModule, ListDisplayComponent, ListHeaderComponent],
  providers: [UsersFacade],

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Users</h1>
        </header>
        <section class="card-body">
          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="facade.users$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="facade.delete($event)"
            (editItem)="facade.edit($event)"
          ></app-list-display>
        </section>
      </section>
    </section>
  `,

  styles: [
    `
      header {
        padding-bottom: 10px;
      }
    `,
  ],
})
export default class UserListComponent implements OnInit {
  facade = inject(UsersFacade);

  columns = ['name', 'email', 'role'];
  headers = ['Name', 'Email', 'Role'];
  isAuthenticated = true;

  ngOnInit() {
    this.facade.loadUsers();
  }
}
