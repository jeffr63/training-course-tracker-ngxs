import { Injectable, inject } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';

import { CourseActions } from '@state/course/course.actions';
import { CourseState } from '@state/course/course.state';

@Injectable({
  providedIn: 'root',
})
export class DashboardStore {
  readonly #store = inject(Store);

  public readonly courses$ = inject(Store).select(CourseState.getCoursesByPath);
  public readonly sources$ = inject(Store).select(CourseState.getCoursesBySource);

  @Dispatch() public getCourseData = () => new CourseActions.GetCourseData();

  public loadChartData() {
    this.#store.dispatch(new CourseActions.LoadCourses()).subscribe(() => {
      this.getCourseData();
    });
  }
}
