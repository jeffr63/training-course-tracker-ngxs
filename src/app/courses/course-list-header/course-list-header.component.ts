import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-list-header',
  templateUrl: './course-list-header.component.html',
  styles: []
})
export class CourseListHeaderComponent implements OnInit {
  @Input() total: number;
  @Input() pageSize: number;
  @Input() maxSize: number;
  @Input() current;
  @Input() isAuthenticated: boolean;
  @Output() refreshTable = new EventEmitter();
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
  }

  onPageChange() {
    this.refreshTable.emit(this.current);
  }

}
