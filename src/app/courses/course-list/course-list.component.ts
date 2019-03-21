import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from './../../auth/auth.service';
import { Course } from './../course';
import { CoursesState } from './../store/state/course.state';
import { Load, GetTotal, Delete } from './../store/actions/course.actions';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Select(CoursesState.getCourses) courses$: Observable<Course[]>;
  selectCourse = <Course>{};
  current = 1;
  loading = false;
  pageSize = 10;
  @Select(CoursesState.getTotalCourses) totalCourses$: Observable<number>;
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(
    private store: Store,
    private modal: NgbModal,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.store.dispatch(new Load({ 'current': this.current, 'pageSize': this.pageSize }));
    this.store.dispatch(new GetTotal());
  }

  deleteCourse(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new Delete({ 'id': id, 'current': this.current, 'pageSize': this.pageSize }));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  refreshTable() {
    this.store.dispatch(new Load({ 'current': this.current, 'pageSize': this.pageSize }));
  }
}
