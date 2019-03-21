import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';

import { CanActivateEdit } from '../auth/canActiveateEdit.guard';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesState } from './store/state/course.state';

const routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseEditComponent, canActivate: [CanActivateEdit] }
];

@NgModule({
  declarations: [
    CourseEditComponent,
    CourseListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    NgxsModule.forFeature([CoursesState]),
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
