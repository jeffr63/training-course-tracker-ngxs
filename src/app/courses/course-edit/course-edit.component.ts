import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { CoursesFacade } from '../courses.facade';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  faSave = faSave;
  faBan = faBan;
  saveId = '';

  constructor(
    private route: ActivatedRoute,
    public facade: CoursesFacade
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.saveId = params.id;
      this.facade.loadCourse(params.id);
    });
  }
}
