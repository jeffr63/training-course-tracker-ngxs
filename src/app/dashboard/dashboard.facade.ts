import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CourseActions } from '../state/course/course.actions';
import { CourseData } from '../models/course';
import { CoursesState } from '../state/course/course.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  @Select(CoursesState.getCoursesByPath) courses$: Observable<CourseData[]>;
  @Select(CoursesState.getCoursesBySource) sources$: Observable<CourseData[]>;

  constructor(private store: Store) {}

  @Dispatch() getCourseData = () => new CourseActions.GetCourseData();

  loadChartData() {
    this.store.dispatch(new CourseActions.LoadCourses()).subscribe(() => {
      this.getCourseData();
    });
  }
}
