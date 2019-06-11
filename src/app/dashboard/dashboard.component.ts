import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { CoursesState } from './../state/course.state';
import { CourseData } from './../shared/course';
import { GetCourseData, Load } from './../state/course.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(CoursesState.getCoursesByPath) courses$: Observable<CourseData[]>;
  @Select(CoursesState.getCoursesBySource) sources$: Observable<CourseData[]>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.dispatch(new Load()).subscribe(() => {
      this.store.dispatch(new GetCourseData());
    });
  }
}
