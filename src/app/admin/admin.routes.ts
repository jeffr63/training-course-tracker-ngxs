import { Routes } from '@angular/router';

import { CanActivateAdmin } from '../auth/canActiveateAdmin.guard';
import { PathTitleResolverService } from '../services/paths/path-title-resolver.service';
import { SourceTitleResolverService } from '../services/sources/source-title-resolver.service';
import { UserTitleResolverService } from '../services/users/user-title-resolver.service';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('./admin.component').then((m) => m.AdminComponent) },
      {
        path: 'sources',
        title: 'Sources',
        loadComponent: () => import('./sources/source-list.component').then((m) => m.SourceListComponent),
      },
      {
        path: 'sources/:id',
        title: SourceTitleResolverService,
        loadComponent: () => import('./sources/source-edit.component').then((m) => m.SourceEditComponent),
      },
      {
        path: 'paths',
        title: 'Paths',
        loadComponent: () => import('./paths/path-list.component').then((m) => m.PathListComponent),
      },
      {
        path: 'paths/:id',
        title: PathTitleResolverService,
        loadComponent: () => import('./paths/path-edit.component').then((m) => m.PathEditComponent),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./users/user-list.component').then((m) => m.UserListComponent),
      },
      {
        path: 'users/:id',
        title: UserTitleResolverService,
        loadComponent: () => import('./users/user-edit.component').then((m) => m.UserEditComponent),
      },
    ],
    canActivate: [CanActivateAdmin],
  },
];
