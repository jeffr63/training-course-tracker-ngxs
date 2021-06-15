import { Component, OnInit } from "@angular/core";

import { faTrashAlt, faBan } from "@fortawesome/free-solid-svg-icons";

import { PathsFacade } from "./paths.facade";

@Component({
  selector: "app-path-list",

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
            (deleteItem)="facade.deletePath($event, deleteModal)"
            (editItem)="facade.editPath($event)"
          ></app-list-display>
        </section>
      </section>

      <ng-template #deleteModal let-modal>
        <div class="modal-header">
          <span class="modal-title">Delete?</span>
        </div>
        <div class="modal-body">
          <p><strong>Are you sure you want to delete this path?</strong></p>
          <p>
            All information associated to this path will be permanently deleted.
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
export class PathListComponent implements OnInit {
  columns = ["name"];
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ["Path"];
  isAuthenticated = true;

  constructor(public facade: PathsFacade) {}

  ngOnInit() {
    this.facade.loadPaths();
  }
}
