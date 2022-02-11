import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { CoursesFacade } from './courses.facade';

@Component({
  selector: 'app-course-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Training Courses</h1>
        </header>
        <section class="card-body">
          <app-pager-list-header
            includePager="true"
            [total]="facade.totalCourses$ | async"
            [pageSize]="facade.pageSize"
            [maxSize]="5"
            [(current)]="facade.current"
            [isAuthenticated]="auth.isAuthenticated()"
            (refreshTable)="facade.refreshTable()"
            (newCourse)="facade.newCourse()"
          >
          </app-pager-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="facade.courses$ | async"
            [isAuthenticated]="auth.isAuthenticated()"
            (deleteItem)="facade.deleteCourse($event)"
            (editItem)="facade.editCourse($event)"
          ></app-list-display>
        </section>
      </section>
    </section>
  `,

  styles: [],
})
export class CourseListComponent implements OnInit {
  columns = ['title', 'instructor', 'path', 'source'];
  headers = ['Title', 'Instructor', 'Path', 'Source'];

  constructor(public auth: AuthService, public facade: CoursesFacade) {}

  ngOnInit() {
    this.facade.loadCourses();
  }
}
