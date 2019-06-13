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
  @Input() @Output() current = new EventEmitter();
  @Input() isAuthenticated: boolean;
  @Output() refreshDisplay = new EventEmitter();
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
  }

  onPageChange() {
    this.current.emit();
    this.refreshDisplay.emit();
  }

}
