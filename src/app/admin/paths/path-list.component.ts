import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplayComponent } from '../../shared/list-display.component';
import { ListHeaderComponent } from '../../shared/list-header.component';
import { PathsFacade } from './paths.facade';

@Component({
  selector: 'app-path-list',
  standalone: true,
  imports: [CommonModule, ListDisplayComponent, ListHeaderComponent, NgbModule],
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
export class PathListComponent implements OnInit {
  columns = ['name'];
  headers = ['Path'];
  isAuthenticated = true;

  constructor(public facade: PathsFacade) {}

  ngOnInit() {
    this.facade.loadPaths();
  }
}
