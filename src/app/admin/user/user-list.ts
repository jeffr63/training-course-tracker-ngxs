import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplay } from '@components/list-display';
import { UserStore } from '@services/user/user-store';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, NgbModule, ListDisplay],
  providers: [UserStore],
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
            [items]="store.users$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="store.delete($event)"
            (editItem)="store.edit($event)"></app-list-display>
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
export default class UserList implements OnInit {
  protected readonly store = inject(UserStore);

  protected readonly columns = ['name', 'email', 'role'];
  protected readonly headers = ['Name', 'Email', 'Role'];
  protected readonly isAuthenticated = true;

  ngOnInit() {
    this.store.loadUsers();
  }
}
