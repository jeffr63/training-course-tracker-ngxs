import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, Select } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '../shared/course';
import { CoursesState } from '../state/course.state';
import { DeleteCourse, GetCoursesPage, LoadCourses, NewCourse, SaveCourse, GetCourse } from '../state/course.actions';
import { LoadPaths } from '../state/paths.actions';
import { LoadSources } from '../state/sources.actions';
import { Path } from '../shared/paths';
import { PathsState } from '../state/paths.state';
import { Source } from '../shared/sources';
import { SourcesState } from '../state/sources.state';

@Injectable()
export class CoursesFacade {
  @Select(CoursesState.getCourse) course$: Observable<Course>;
  @Select(CoursesState.getPagedCourses) courses$: Observable<Course[]>;
  closedResult = '';
  current = 1;
  pageSize = 10;
  @Select(PathsState.getPaths) paths$: Observable<Path[]>;
  @Select(SourcesState.getSources) sources$: Observable<Source[]>;
  @Select(CoursesState.getTotalCourses) totalCourses$: Observable<number>;

  constructor(
    private store: Store,
    private modal: NgbModal,
    private location: Location,
    private router: Router
  ) { }

  cancelEdit() {
    this.location.back();
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

  loadCourses() {
    this.store.dispatch(new LoadCourses()).subscribe(() => {
      this.refreshTable();
    });
  }

  loadCourse(id) {
    if (id === 'new') {
      this.store.dispatch(new NewCourse());
    } else {
      this.store.dispatch(new GetCourse(id));
    }

    this.store.dispatch(new LoadPaths());
    this.store.dispatch(new LoadSources());
  }

  newCourse() {
    this.router.navigate(['/courses/new']);
  }

  refreshTable() {
    this.store.dispatch(new GetCoursesPage({ 'current': this.current, 'pageSize': this.pageSize }));
  }

  saveCourse() {
    this.store.dispatch(new SaveCourse());
    this.location.back();
    this.refreshTable();
  }
}
