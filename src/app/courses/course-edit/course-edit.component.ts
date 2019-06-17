import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Course } from '../../shared/course';
import { CoursesFacadeService } from '../courses-facade.service';
import { Path } from '../../shared/paths';
import { Source } from '../../shared/sources';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  course$: Observable<Course> = this.facade.course$;
  faSave = faSave;
  faBan = faBan;
  paths$: Observable<Path[]> = this.facade.paths$;
  sources$: Observable<Source[]> = this.facade.sources$;

  constructor(
    private route: ActivatedRoute,
    public facade: CoursesFacadeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.facade.loadCourse(params.id);
    });
  }
}
