import { Injectable, inject } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CourseActions } from '@state/course/course.actions';
import { CourseData } from '@models/course';
import { CoursesState } from '@state/course/course.state';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  readonly #store = inject(Store);

  public readonly courses$ = inject(Store).select(CoursesState.getCoursesByPath);
  public readonly sources$ = inject(Store).select(CoursesState.getCoursesBySource);

  @Dispatch() public getCourseData = () => new CourseActions.GetCourseData();

  public loadChartData() {
    this.#store.dispatch(new CourseActions.LoadCourses()).subscribe(() => {
      this.getCourseData();
    });
  }
}
