import { CoursesState } from './../store/state/course.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faSave, faBan, faAddressBook } from '@fortawesome/free-solid-svg-icons';

import { Course } from '../course';
import { PathsState } from './../../store/state/paths.state';
import { SourcesState } from './../../store/state/sources.state';
import * as courseActions from '../store/actions/course.actions';
import * as fromPaths from '../../store/actions/paths.actions';
import * as fromSources from '../../store/actions/sources.actions';


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
