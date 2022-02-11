import { Component, OnInit } from '@angular/core';

import { PathsFacade } from './paths.facade';

@Component({
  selector: 'app-path-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Paths</h1>
        </header>
        <section class="card-body">
          <app-list-header (newItem)="facade.newPath()"></app-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="facade.paths$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="facade.deletePath($event)"
            (editItem)="facade.editPath($event)"
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
export class PathListComponent implements OnInit {
  columns = ['name'];
  headers = ['Path'];
  isAuthenticated = true;

  constructor(public facade: PathsFacade) {}

  ngOnInit() {
    this.facade.loadPaths();
  }
}
