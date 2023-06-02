import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplayComponent } from '@components/list-display.component';
import { ListHeaderComponent } from '@components/list-header.component';
import { PathsFacade } from '@facades/paths.facade';

@Component({
  selector: 'app-path-list',
  standalone: true,
  imports: [AsyncPipe, ListDisplayComponent, ListHeaderComponent, NgbModule],
  providers: [PathsFacade],

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Paths</h1>
        </header>
        <section class="card-body">
          <app-list-header (newItem)="facade.new()"></app-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="facade.paths$ | async"
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
export default class PathListComponent implements OnInit {
  public facade = inject(PathsFacade);

  columns = ['name'];
  headers = ['Path'];
  isAuthenticated = true;

  ngOnInit() {
    this.facade.loadPaths();
  }
}
