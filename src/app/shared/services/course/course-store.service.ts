import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Course } from '@models/course';
import { CourseActions } from '@state/course/course.actions';
import { CourseState } from '@state/course/course.state';
import { DeleteComponent } from '@modals/delete.component';
import { ModalDataService } from '@modals/modal-data.service';
import { PathActions } from '@state/paths/path.actions';
import { PathState } from '@state/paths/path.state';
import { SourcesActions } from '@state/sources/source.actions';
import { SourceState } from '@state/sources/source.state';

@Injectable()
export class CourseStore {
  readonly #actions = inject(Actions);
  readonly #modal = inject(NgbModal);
  readonly #location = inject(Location);
  readonly #router = inject(Router);
  readonly #modalDataService = inject(ModalDataService);

  public closedResult = '';
  public current = 1;
  public pageSize = 10;

  public readonly course$ = inject(Store).select(CourseState.getCourse);
  public readonly courses$ = inject(Store).select(CourseState.getPagedCourses);
  public readonly paths$ = inject(Store).select(PathState.getPaths);
  public readonly sources$ = inject(Store).select(SourceState.getSources);
  public readonly totalCourses$ = inject(Store).select(CourseState.getTotalCourses);

  @Dispatch()
  public deleteCourse = (id) =>
    new CourseActions.DeleteCourse({
      id: id,
      current: this.current,
      pageSize: this.pageSize,
    });
  @Dispatch() public loadCourse = (id) => [
    id === 'new' ? new CourseActions.NewCourse() : new CourseActions.GetCourse(id),
    new PathActions.LoadPaths(),
    new SourcesActions.LoadSources(),
  ];
  @Dispatch() public loadCourses = () => new CourseActions.LoadCourses();
  @Dispatch() public refreshTable = () =>
    new CourseActions.GetCoursesPage({ current: this.current, pageSize: this.pageSize });
  @Dispatch() public saveCourse = (course) => new CourseActions.SaveCourse(course);

  public cancel() {
    this.#location.back();
  }

  public delete(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this course?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then(
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
    this.#router.navigate(['/courses', id]);
  }

  public loadAll() {
    this.loadCourses();
    this.#actions.pipe(ofActionSuccessful(CourseActions.LoadCourses)).subscribe(() => {
      this.refreshTable();
    });
  }

  public new() {
    this.#router.navigate(['/courses/new']);
  }

  public save(id: string, course: Course) {
    this.saveCourse(course);
    this.#actions.pipe(ofActionSuccessful(CourseActions.SaveCourse)).subscribe(() => {
      if (id === 'New') {
        this.loadCourses();
        this.#actions.pipe(ofActionSuccessful(CourseActions.LoadCourses)).subscribe(() => {
          this.refreshTable();
        });
      } else {
        this.refreshTable();
      }
    });
    this.#location.back();
  }
}
