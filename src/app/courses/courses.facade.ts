import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '../shared/course';
import { CoursesState } from '../state/course/course.state';
import { CourseActions } from '../state/course/course.actions';
import { PathActions } from '../state/paths/paths.actions';
import { SourceActions } from '../state/sources/sources.actions';
import { Path } from '../shared/paths';
import { PathsState } from '../state/paths/paths.state';
import { Source } from '../shared/sources';
import { SourcesState } from '../state/sources/sources.state';

@Injectable()
export class CoursesFacade {
  @Select(CoursesState.getCourse) public course$: Observable<Course>;
  @Select(CoursesState.getPagedCourses) public courses$: Observable<Course[]>;
  @Select(PathsState.getPaths) public paths$: Observable<Path[]>;
  @Select(SourcesState.getSources) public sources$: Observable<Source[]>;
  @Select(CoursesState.getTotalCourses)
  public totalCourses$: Observable<number>;

  public closedResult = '';
  public current = 1;
  public pageSize = 10;

  constructor(
    private actions$: Actions,
    private store: Store,
    private modal: NgbModal,
    private location: Location,
    private router: Router
  ) {}

  public cancelEdit() {
    this.location.back();
  }

  public deleteCourse(id, deleteModal) {
    this.modal.open(deleteModal).result.then(
      (result) => {
        this.closedResult = `Closed with ${result}`;
        this.store.dispatch(
          new CourseActions.DeleteCourse({
            id: id,
            current: this.current,
            pageSize: this.pageSize,
          })
        );
      },
      (reason) => {
        this.closedResult = `Dismissed with ${reason}`;
      }
    );
  }

  public editCourse(id) {
    this.router.navigate(['/courses', id]);
  }

  public loadCourses() {
    this.store.dispatch(new CourseActions.LoadCourses());
    this.actions$.pipe(ofActionSuccessful(CourseActions.LoadCourses)).subscribe(() => {
      this.refreshTable();
    });
  }

  public loadCourse(id) {
    if (id === 'new') {
      this.store.dispatch(new CourseActions.NewCourse());
    } else {
      this.store.dispatch(new CourseActions.GetCourse(id));
    }

    this.store.dispatch(new PathActions.LoadPaths());
    this.store.dispatch(new SourceActions.LoadSources());
  }

  public newCourse() {
    this.router.navigate(['/courses/new']);
  }

  public refreshTable() {
    this.store.dispatch(new CourseActions.GetCoursesPage({ current: this.current, pageSize: this.pageSize }));
  }

  public saveCourse(id) {
    this.store.dispatch(new CourseActions.SaveCourse());
    this.actions$.pipe(ofActionSuccessful(CourseActions.SaveCourse)).subscribe(() => {
      if (id === 'new') {
        this.store.dispatch(new CourseActions.LoadCourses());
        this.actions$.pipe(ofActionSuccessful(CourseActions.LoadCourses)).subscribe(() => {
          this.refreshTable();
        });
      } else {
        this.refreshTable();
      }
    });
    this.location.back();
  }
}
