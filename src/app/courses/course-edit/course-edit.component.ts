import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { GetCourse, NewCourse, SaveCourse } from '../../state/course.actions';
import { CoursesState } from '../../state/course.state';
import { Course } from '../../shared/course';
import { LoadPaths } from '../../state/paths.actions';
import { PathsState } from '../../state/paths.state';
import { LoadSources } from '../../state/sources.actions';
import { SourcesState } from '../../state/sources.state';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  @Select(CoursesState.getCourse) course$: Observable<Course>;
  @Select(PathsState.getPaths) paths$: Observable<any[]>;
  @Select(SourcesState.getSources) sources$: Observable<any[]>;
  loading = false;
  componentActive = true;
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
        this.store.dispatch(new NewCourse());
      } else {
        this.store.dispatch(new GetCourse(params.id));
      }
    });

    this.store.dispatch(new LoadPaths());
    this.store.dispatch(new LoadSources());
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(new SaveCourse());
    this.location.back();
  }

}
