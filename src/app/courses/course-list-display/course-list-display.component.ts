import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Course } from './../../shared/course';

@Component({
  selector: 'app-course-list-display',
  templateUrl: './course-list-display.component.html',
  styles: []
})
export class CourseListDisplayComponent implements OnInit {
  @Input() courses: Course[];
  @Input() isAuthenticated: boolean;
  @Output() deleteCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  constructor() { }

  ngOnInit() {
  }

  editClicked(id: number) {
    this.editCourse.emit(id);
  }

  deleteClicked(id: number) {
      this.deleteCourse.emit(id);
  }

}
