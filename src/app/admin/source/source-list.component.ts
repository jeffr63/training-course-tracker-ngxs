import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplayComponent } from '@components/list-display.component';
import { ListHeaderComponent } from '@components/list-header.component';
import { SourceStore } from '@services/source/source-store.service';

@Component({
  selector: 'app-source-list',
  imports: [AsyncPipe, NgbModule, ListDisplayComponent, ListHeaderComponent],
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
export default class SourceListComponent implements OnInit {
  protected readonly facade = inject(SourceStore);

  protected readonly columns = ['name'];
  protected readonly headers = ['Source'];
  protected readonly isAuthenticated = true;

  ngOnInit() {
    this.facade.loadSources();
  }
}
