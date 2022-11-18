import { inject } from '@angular/core';
import { Route } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { PathTitleResolverService } from '../services/paths/path-title-resolver.service';
import { SourceTitleResolverService } from '../services/sources/source-title-resolver.service';
import { UserTitleResolverService } from '../services/users/user-title-resolver.service';

export default [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('./admin.component') },
      {
        path: 'sources',
        title: 'Sources',
        loadComponent: () => import('./sources/source-list.component'),
      },
      {
        path: 'sources/:id',
        title: SourceTitleResolverService,
        loadComponent: () => import('./sources/source-edit.component'),
      },
      {
        path: 'paths',
        title: 'Paths',
        loadComponent: () => import('./paths/path-list.component'),
      },
      {
        path: 'paths/:id',
        title: PathTitleResolverService,
        loadComponent: () => import('./paths/path-edit.component'),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./users/user-list.component'),
      },
      {
        path: 'users/:id',
        title: UserTitleResolverService,
        loadComponent: () => import('./users/user-edit.component'),
      },
    ],
    canActivate: [() => inject(AuthService).isLoggedInAsAdmin()],
  },
] as Route[];
