import { Component, OnInit } from '@angular/core';

import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth/auth.service';
import { CoursesFacade } from './courses.facade';

@Component({
  selector: "app-course-list",

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
            (deleteItem)="facade.deleteCourse($event, deleteModal)"
            (editItem)="facade.editCourse($event)"
          ></app-list-display>
        </section>
      </section>

      <ng-template #deleteModal let-modal>
        <div class="modal-header">
          <span class="modal-title">Delete?</span>
        </div>
        <div class="modal-body">
          <p><strong>Are you sure you want to delete this course?</strong></p>
          <p>
            All information associated to this course will be permanently
            deleted.
            <span class="text-danger">This operation can not be undone.</span>
          </p>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            (click)="modal.close()"
            title="Delete"
          >
            <fa-icon [icon]="faTrashAlt"></fa-icon> Delete
          </button>
          <button
            class="btn btn-danger"
            (click)="modal.dismiss()"
            title="Cancel"
          >
            <fa-icon [icon]="faBan"></fa-icon> Cancel
          </button>
        </div>
      </ng-template>
    </section>
  `,

  styles: [],
})
export class CourseListComponent implements OnInit {
  columns = ["title", "instructor", "path", "source"];
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ["Title", "Instructor", "Path", "Source"];

  constructor(public auth: AuthService, public facade: CoursesFacade) {}

  ngOnInit() {
    this.facade.loadCourses();
  }
}
