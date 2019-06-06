import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Course } from '../../shared/course';
import { CoursesState } from '../../state/course.state';
import { PathsState } from '../../state/paths.state';
import { SourcesState } from '../../state/sources.state';
import * as courseActions from '../../state/course.actions';
import * as fromPaths from '../../state/paths.actions';
import * as fromSources from '../../state/sources.actions';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  @Select(CoursesState.getCourse) course$: Observable<Course>;
  loading = false;
  componentActive = true;
  @Select(PathsState.getPaths) paths$: Observable<any[]>;
  @Select(SourcesState.getSources) sources$: Observable<any[]>;
  faSave = faSave;
  faBan = faBan;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id === 'new') {
        this.store.dispatch(new courseActions.NewCourse());
      } else {
        this.store.dispatch(new courseActions.GetCourse(params.id));
      }
    });

    this.store.dispatch(new fromPaths.Load());
    this.store.dispatch(new fromSources.Load());
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(new courseActions.Save());
    this.location.back();
  }

}
