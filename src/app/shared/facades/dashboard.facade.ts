import { Injectable, inject } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CourseActions } from '@state/course/course.actions';
import { CourseData } from '@models/course';
import { CoursesState } from '@state/course/course.state';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  store = inject(Store);

  @Select(CoursesState.getCoursesByPath) courses$: Observable<CourseData[]>;
  @Select(CoursesState.getCoursesBySource) sources$: Observable<CourseData[]>;

  @Dispatch() getCourseData = () => new CourseActions.GetCourseData();

  loadChartData() {
    this.store.dispatch(new CourseActions.LoadCourses()).subscribe(() => {
      this.getCourseData();
    });
  }
}
