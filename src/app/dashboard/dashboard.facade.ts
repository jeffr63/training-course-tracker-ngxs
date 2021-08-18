import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CourseData } from '../shared/course';
import { CoursesState } from '../state/course/course.state';
import { LoadCourses, GetCourseData } from '../state/course/course.actions';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  @Select(CoursesState.getCoursesByPath) courses$: Observable<CourseData[]>;
  @Select(CoursesState.getCoursesBySource) sources$: Observable<CourseData[]>;

  constructor(private store: Store) {}

  loadChartData() {
    this.store.dispatch(new LoadCourses()).subscribe(() => {
      this.store.dispatch(new GetCourseData());
    });
  }
}
