import { Routes } from '@angular/router';

import { CanActivateEdit } from '../auth/canActiveateEdit.guard';
import { CourseTitleResolverService } from '../services/courses/course-title-resolver.service';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('./course-list.component').then((m) => m.CourseListComponent) },
      {
        path: ':id',
        title: CourseTitleResolverService,
        loadComponent: () => import('./course-edit.component').then((m) => m.CourseEditComponent),
        canActivate: [CanActivateEdit],
      },
    ],
  },
];
