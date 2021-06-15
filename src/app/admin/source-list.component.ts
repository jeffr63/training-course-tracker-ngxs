import { Component, OnInit } from "@angular/core";

import { faTrashAlt, faBan } from "@fortawesome/free-solid-svg-icons";

import { SourcesFacade } from "./sources.facade";

@Component({
  selector: "app-source-list",

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
            (deleteItem)="facade.deleteSource($event, deleteModal)"
            (editItem)="facade.editSource($event)"
          ></app-list-display>
        </section>
      </section>

      <ng-template #deleteModal let-modal>
        <div class="modal-header">
          <span class="modal-title">Delete?</span>
        </div>
        <div class="modal-body">
          <p><strong>Are you sure you want to delete this source?</strong></p>
          <p>
            All information associated to this source will be permanently
            deleted.
            <span class="text-danger">This operation can not be undone.</span>
          </p>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-success"
            (click)="modal.close()"
            title="Delete"
          >
            <fa-icon [icon]="faTrashAlt"></fa-icon> Delete
          </button>
          <button
            class="btn btn-danger"
            (click)="modal.dismiss()"
            title="Cancel"
          >
            <fa-icon [icon]="faBan"></fa-icon> Cancel
          </button>
        </div>
      </ng-template>
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
  columns = ["name"];
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ["Source"];
  isAuthenticated = true;

  constructor(public facade: SourcesFacade) {}

  ngOnInit() {
    this.facade.loadSources();
  }
}
