import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";

import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-list-display",

  template: `
    <table class="table table-striped">
      <thead>
        <th *ngFor="let header of headers">
          {{ header }}
        </th>
        <th>&nbsp;</th>
      </thead>
      <tbody>
        <tr *ngFor="let item of items">
          <td *ngFor="let column of columns">
            {{ item[column] }}
          </td>
          <td *ngIf="isAuthenticated">
            <button
              class="btn btn-info btn-sm mr-2"
              (click)="editClicked(item.id)"
              title="Edit"
            >
              <fa-icon [icon]="faPencilAlt"></fa-icon>
              <span class="sr-only">Edit</span>
            </button>
            <button
              class="btn btn-danger btn-sm"
              (click)="deleteClicked(item.id)"
              title="Delete"
            >
              <fa-icon [icon]="faTrashAlt"></fa-icon>
              <span class="sr-only">Delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,

  styles: [],
})
export class ListDisplayComponent {
  @Input() columns: string[];
  @Input() headers: string[];
  @Input() items: any[];
  @Input() isAuthenticated: boolean;
  @Output() deleteItem = new EventEmitter();
  @Output() editItem = new EventEmitter();

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  constructor() {}

  editClicked(id: number) {
    this.editItem.emit(id);
  }

  deleteClicked(id: number) {
    this.deleteItem.emit(id);
  }
}
