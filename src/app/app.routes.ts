import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin',
    title: 'Administration',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'courses',
    title: 'Courses',
    loadChildren: () => import('./courses/course.routes').then((m) => m.COURSE_ROUTES),
  },
  { path: 'home', title: 'Home', component: DashboardComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
