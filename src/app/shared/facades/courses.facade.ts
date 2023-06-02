import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '@models/course';
import { CourseActions } from '@state/course/course.actions';
import { CoursesState } from '@state/course/course.state';
import { DeleteComponent } from '@modals/delete.component';
import { ModalDataService } from '@modals/modal-data.service';
import { Path } from '@models/paths';
import { PathsActions } from '@state/paths/paths.actions';
import { PathsState } from '@state/paths/paths.state';
import { Source } from '@models/sources';
import { SourcesActions } from '@state/sources/sources.actions';
import { SourcesState } from '@state/sources/sources.state';

@Injectable()
export class CoursesFacade {
  actions$ = inject(Actions);
  modal = inject(NgbModal);
  location = inject(Location);
  router = inject(Router);
  modalDataService = inject(ModalDataService);

  public closedResult = '';
  public current = 1;
  public pageSize = 10;

  @Select(CoursesState.getCourse) public course$: Observable<Course>;
  @Select(CoursesState.getPagedCourses) public courses$: Observable<Course[]>;
  @Select(PathsState.getPaths) public paths$: Observable<Path[]>;
  @Select(SourcesState.getSources) public sources$: Observable<Source[]>;
  @Select(CoursesState.getTotalCourses) public totalCourses$: Observable<number>;

  @Dispatch()
  deleteCourse = (id) =>
    new CourseActions.DeleteCourse({
      id: id,
      current: this.current,
      pageSize: this.pageSize,
    });
  @Dispatch() loadCourse = (id) => [
    id === 'new' ? new CourseActions.NewCourse() : new CourseActions.GetCourse(id),
    new PathsActions.LoadPaths(),
    new SourcesActions.LoadSources(),
  ];
  @Dispatch() loadCourses = () => new CourseActions.LoadCourses();
  @Dispatch() refreshTable = () => new CourseActions.GetCoursesPage({ current: this.current, pageSize: this.pageSize });
  @Dispatch() saveCourse = (course) => new CourseActions.SaveCourse(course);

  public cancel() {
    this.location.back();
  }

  public delete(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this course?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then(
      (result) => {
        this.closedResult = `Closed with ${result}`;
        this.deleteCourse(id);
      },
      (reason) => {
        this.closedResult = `Dismissed with ${reason}`;
      }
    );
  }

  public edit(id) {
    this.router.navigate(['/courses', id]);
  }

  public loadAll() {
    this.loadCourses();
    this.actions$.pipe(ofActionSuccessful(CourseActions.LoadCourses)).subscribe(() => {
      this.refreshTable();
    });
  }

  public new() {
    this.router.navigate(['/courses/new']);
  }

  public save(id: string, course: Course) {
    this.saveCourse(course);
    this.actions$.pipe(ofActionSuccessful(CourseActions.SaveCourse)).subscribe(() => {
      if (id === 'New') {
        this.loadCourses();
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
