import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplay } from '@components/list-display';
import { ListHeader } from '@components/list-header';
import { SourceStore } from '@services/source/source-store';

@Component({
  selector: 'app-source-list',
  imports: [AsyncPipe, NgbModule, ListDisplay, ListHeader],
  providers: [SourceStore],
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
  ],
})
export default class SourceList implements OnInit {
  protected readonly facade = inject(SourceStore);

  protected readonly columns = ['name'];
  protected readonly headers = ['Source'];
  protected readonly isAuthenticated = true;

  ngOnInit() {
    this.facade.loadSources();
  }
}
