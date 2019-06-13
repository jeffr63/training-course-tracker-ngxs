import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-list-header',
  templateUrl: './course-list-header.component.html',
  styles: []
})
export class CourseListHeaderComponent {
  @Input() current;
  @Input() isAuthenticated: boolean;
  @Input() maxSize: number;
  @Input() pageSize: number;
  @Input() total: number;
  @Output() currentChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() refreshTable = new EventEmitter();
  faPlusCircle = faPlusCircle;

  onPageChange() {
    this.currentChange.emit(this.current);
    this.refreshTable.emit();
  }

}
