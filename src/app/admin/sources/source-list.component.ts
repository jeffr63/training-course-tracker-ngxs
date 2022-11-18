import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplayComponent } from '../../shared/list-display.component';
import { ListHeaderComponent } from '../../shared/list-header.component';
import { SourcesFacade } from './sources.facade';

@Component({
  selector: 'app-source-list',
  standalone: true,
  imports: [AsyncPipe, NgbModule, ListDisplayComponent, ListHeaderComponent],
  providers: [SourcesFacade],

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Sources</h1>
        </header>
        <section class="card-body">
          <app-list-header (newItem)="facade.new()"></app-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="facade.sources$ | async"
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
export default class SourceListComponent implements OnInit {
  columns = ['name'];
  headers = ['Source'];
  isAuthenticated = true;

  constructor(public facade: SourcesFacade) {}

  ngOnInit() {
    this.facade.loadSources();
  }
}
