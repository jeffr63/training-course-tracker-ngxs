import { Component, OnInit } from '@angular/core';

import { UsersFacade } from './users.facade';

@Component({
  selector: 'app-user-list',

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
            (deleteItem)="facade.deleteUser($event)"
            (editItem)="facade.editUser($event)"
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
export class UserListComponent implements OnInit {
  columns = ['name', 'email', 'role'];
  headers = ['Name', 'Email', 'Role'];
  isAuthenticated = true;

  constructor(public facade: UsersFacade) {}

  ngOnInit() {
    this.facade.loadUsers();
  }
}
