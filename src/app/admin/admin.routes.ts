import { inject } from '@angular/core';
import { Route } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { pathNameResolver } from '@resolvers/path-title-resolver.service';
import { sourceNameResolver } from '@resolvers/source-title-resolver.service';
import { userNameResolver } from '@resolvers/user-title-resolver.service';

export default [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('./admin.component') },
      {
        path: 'sources',
        title: 'Sources',
        loadComponent: () => import('./source-list.component'),
      },
      {
        path: 'sources/:id',
        title: sourceNameResolver,
        loadComponent: () => import('./source-edit.component'),
      },
      {
        path: 'paths',
        title: 'Paths',
        loadComponent: () => import('./path-list.component'),
      },
      {
        path: 'paths/:id',
        title: pathNameResolver,
        loadComponent: () => import('./path-edit.component'),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./user-list.component'),
      },
      {
        path: 'users/:id',
        title: userNameResolver,
        loadComponent: () => import('./user-edit.component'),
      },
    ],
    canActivate: [() => inject(AuthService).isLoggedInAsAdmin()],
  },
] as Route[];
