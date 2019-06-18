import { Component, OnInit } from '@angular/core';

import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { AuthService } from './../../auth/auth.service';
import { Course } from '../../shared/course';
import { CoursesFacade } from '../courses.facade';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]> = this.facade.courses$;
  columns = ['title', 'instructor', 'path', 'source'];
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ['Title', 'Instructor', 'Path', 'Source'];
  totalCourses$: Observable<number> = this.facade.totalCourses$;

  constructor(
    public auth: AuthService,
    public facade: CoursesFacade,
  ) { }

  ngOnInit() {
    this.facade.loadCourses();
  }
}
