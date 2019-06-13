import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pager-list-header',
  templateUrl: './pager-list-header.component.html',
  styles: []
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
