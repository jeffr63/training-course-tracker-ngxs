import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CanActivateEdit } from '../auth/canActiveateEdit.guard';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListDisplayComponent } from './course-list-display/course-list-display.component';
import { CourseListHeaderComponent } from './course-list-header/course-list-header.component';

const routes = [
  {
    path: '', children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseEditComponent, canActivate: [CanActivateEdit] }
    ]
  }
];

@NgModule({
  declarations: [
    CourseEditComponent,
    CourseListComponent,
    CourseListDisplayComponent,
    CourseListHeaderComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
