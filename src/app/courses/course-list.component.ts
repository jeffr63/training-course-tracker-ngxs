import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../shared/services/auth.service';

import { CoursesFacade } from '@facades/courses.facade';
import { ListDisplayComponent } from '@components/list-display.component';
import { PagerListHeaderComponent } from '@components/pager-list-header.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [AsyncPipe, ListDisplayComponent, PagerListHeaderComponent, NgbModule],
  providers: [CoursesFacade],

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
            [isAuthenticated]="isLoggedIn()"
            (refreshTable)="facade.refreshTable()"
            (newCourse)="facade.new()">
          </app-pager-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="facade.courses$ | async"
            [isAuthenticated]="isLoggedIn()"
            (deleteItem)="facade.delete($event)"
            (editItem)="facade.edit($event)"></app-list-display>
        </section>
      </section>
    </section>
  `,

  styles: [],
})
export default class CourseListComponent implements OnInit {
  readonly #auth = inject(AuthService);
  protected readonly facade = inject(CoursesFacade);

  protected readonly columns = ['title', 'instructor', 'path', 'source'];
  protected readonly headers = ['Title', 'Instructor', 'Path', 'Source'];
  protected readonly isLoggedIn = this.#auth.isLoggedIn;

  ngOnInit() {
    this.facade.loadAll();
  }
}
