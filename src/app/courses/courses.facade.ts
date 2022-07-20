import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '../models/course';
import { CourseActions } from '../state/course/course.actions';
import { CoursesState } from '../state/course/course.state';
import { DeleteComponent } from './../modals/delete.component';
import { ModalDataService } from './../modals/modal-data.service';
import { Path } from '../models/paths';
import { PathsActions } from '../state/paths/paths.actions';
import { PathsState } from '../state/paths/paths.state';
import { Source } from '../models/sources';
import { SourcesActions } from '../state/sources/sources.actions';
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
    private router: Router,
    private modalDataService: ModalDataService
  ) {}

  public cancelEdit() {
    this.location.back();
  }

  public deleteCourse(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this course?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then(
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

    this.store.dispatch(new PathsActions.LoadPaths());
    this.store.dispatch(new SourcesActions.LoadSources());
  }

  public newCourse() {
    this.router.navigate(['/courses/new']);
  }

  public refreshTable() {
    this.store.dispatch(new CourseActions.GetCoursesPage({ current: this.current, pageSize: this.pageSize }));
  }

  public saveCourse(id: string, course: Course) {
    this.store.dispatch(new CourseActions.SaveCourse(course));
    this.actions$.pipe(ofActionSuccessful(CourseActions.SaveCourse)).subscribe(() => {
      if (id === 'New') {
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
