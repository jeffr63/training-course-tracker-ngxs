import { Component, OnInit } from '@angular/core';

import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthService } from './../../auth/auth.service';
import { Course } from '../../shared/course';
import { CoursesState } from '../../state/course.state';
import { DeleteCourse, LoadCourses, GetCoursesPage } from '../../state/course.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Select(CoursesState.getPagedCourses) courses$: Observable<Course[]>;
  selectCourse = <Course>{};
  selectedId: number;
  current = 1;
  loading = false;
  pageSize = 10;
  @Select(CoursesState.getTotalCourses) totalCourses$: Observable<number>;
  closedResult = '';
  faTrashAlt = faTrashAlt;
  faBan = faBan;

  constructor(
    private store: Store,
    private modal: NgbModal,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadCourses()).subscribe(() => {
      this.refreshTable();
    });
  }

  deleteCourse(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new DeleteCourse({ 'id': id, 'current': this.current, 'pageSize': this.pageSize }));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  editCourse(id) {
    this.router.navigate(['/courses', id]);
  }

  refreshTable() {
    this.store.dispatch(new GetCoursesPage({ 'current': this.current, 'pageSize': this.pageSize }));
  }
}
