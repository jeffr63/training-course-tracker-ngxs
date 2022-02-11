import { Component, OnInit } from '@angular/core';

import { SourcesFacade } from './sources.facade';

@Component({
  selector: 'app-source-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Sources</h1>
        </header>
        <section class="card-body">
          <app-list-header (newItem)="facade.newSource()"></app-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="facade.sources$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="facade.deleteSource($event)"
            (editItem)="facade.editSource($event)"
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
export class SourceListComponent implements OnInit {
  columns = ['name'];
  headers = ['Source'];
  isAuthenticated = true;

  constructor(public facade: SourcesFacade) {}

  ngOnInit() {
    this.facade.loadSources();
  }
}
