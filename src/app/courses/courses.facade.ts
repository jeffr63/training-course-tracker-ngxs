import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '../shared/course';
import { CoursesState } from '../state/course.state';
import { DeleteCourse, GetCoursesPage, LoadCourses, NewCourse, SaveCourse, GetCourse, SaveCourseSuccess } from '../state/course.actions';
import { LoadPaths } from '../state/paths.actions';
import { LoadSources } from '../state/sources.actions';
import { Path } from '../shared/paths';
import { PathsState } from '../state/paths.state';
import { Source } from '../shared/sources';
import { SourcesState } from '../state/sources.state';

@Injectable()
export class CoursesFacade {
  @Select(CoursesState.getCourse) public course$: Observable<Course>;
  @Select(CoursesState.getPagedCourses) public courses$: Observable<Course[]>;
  @Select(PathsState.getPaths) public paths$: Observable<Path[]>;
  @Select(SourcesState.getSources) public sources$: Observable<Source[]>;
  @Select(CoursesState.getTotalCourses) public totalCourses$: Observable<number>;

  public closedResult = '';
  public current = 1;
  public pageSize = 10;

  constructor(
    private actions$: Actions,
    private store: Store,
    private modal: NgbModal,
    private location: Location,
    private router: Router
  ) { }

  public cancelEdit() {
    this.location.back();
  }

  public deleteCourse(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new DeleteCourse({ 'id': id, 'current': this.current, 'pageSize': this.pageSize }));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  public editCourse(id) {
    this.router.navigate(['/courses', id]);
  }

  public loadCourses() {
    this.store.dispatch(new LoadCourses());
    this.actions$.pipe(ofActionSuccessful(LoadCourses)).subscribe(() => {
      this.refreshTable();
    });
  }

  public loadCourse(id) {
    if (id === 'new') {
      this.store.dispatch(new NewCourse());
    } else {
      this.store.dispatch(new GetCourse(id));
    }

    this.store.dispatch(new LoadPaths());
    this.store.dispatch(new LoadSources());
  }

  public newCourse() {
    this.router.navigate(['/courses/new']);
  }

  public refreshTable() {
    this.store.dispatch(new GetCoursesPage({ 'current': this.current, 'pageSize': this.pageSize }));
  }

  public saveCourse(id) {
    this.store.dispatch(new SaveCourse());
    this.actions$.pipe(ofActionSuccessful(SaveCourse)).subscribe(() => {
      if (id === 'new') {
        this.store.dispatch(new LoadCourses);
        this.actions$.pipe(ofActionSuccessful(LoadCourses)).subscribe(() => {
          this.refreshTable();
        });
      } else {
        this.refreshTable();
      }
    });
    this.location.back();
  }
}
