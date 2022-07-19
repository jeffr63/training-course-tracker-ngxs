import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pager-list-header',

  template: `
    <header class="row">
      <div class="col">
        <ngb-pagination
          [collectionSize]="total"
          [boundaryLinks]="true"
          [pageSize]="pageSize"
          [maxSize]="maxSize"
          [rotate]="true"
          [(page)]="current"
          (pageChange)="onPageChange()"
        ></ngb-pagination>
      </div>
      <div class="col" *ngIf="isAuthenticated">
        <button class="btn btn-sm" (click)="newClicked()" title="Add">
          <fa-icon [icon]="faPlusCircle" class="fa-2x text-success"></fa-icon>
        </button>
      </div>
    </header>
  `,

  styles: [],
})
export class PagerListHeaderComponent {
  @Input() current: number = 1;
  @Input() isAuthenticated: boolean = false;
  @Input() maxSize: number = 5;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Output() currentChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() newCourse = new EventEmitter();
  @Output() refreshTable = new EventEmitter();
  faPlusCircle = faPlusCircle;

  onPageChange() {
    this.currentChange.emit(this.current);
    this.refreshTable.emit();
  }

  newClicked() {
    this.newCourse.emit();
  }
}
