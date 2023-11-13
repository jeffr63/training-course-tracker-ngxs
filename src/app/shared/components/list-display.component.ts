import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-display',
  standalone: true,
  imports: [NgbModule],

  template: `
    <table class="table table-striped">
      <thead>
        @for (header of headers; track header) {
        <th>{{ header }}</th>
        }
        <th>&nbsp;</th>
      </thead>
      <tbody>
        @for (item of items; track item) {
        <tr>
          @for (column of columns; track column) {
          <td>{{ item[column] }}</td>
          } @if (isAuthenticated) {
          <td>
            <button class="btn btn-info btn-sm me-2" (click)="editClicked(item.id)" title="Edit">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger btn-sm" (click)="deleteClicked(item.id)" title="Delete">
              <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
          }
        </tr>
        }
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

  editClicked(id: number) {
    this.editItem.emit(id);
  }

  deleteClicked(id: number) {
    this.deleteItem.emit(id);
  }
}
