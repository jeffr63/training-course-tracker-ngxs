import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplayComponent } from '@components/list-display.component';
import { UsersFacade } from '@facades/users.facade';

@Component({
    selector: 'app-user-list',
    imports: [AsyncPipe, NgbModule, ListDisplayComponent],
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
            (editItem)="facade.edit($event)"></app-list-display>
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
    ]
})
export default class UserListComponent implements OnInit {
  protected readonly facade = inject(UsersFacade);

  protected readonly columns = ['name', 'email', 'role'];
  protected readonly headers = ['Name', 'Email', 'Role'];
  protected readonly isAuthenticated = true;

  ngOnInit() {
    this.facade.loadUsers();
  }
}
