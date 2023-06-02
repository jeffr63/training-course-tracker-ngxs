import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  deleteUser(id) {
    return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
  }

  getUser(id) {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  loadUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users?_sort=name&_order=asc`);
  }

  patchUser(id: number, patch: any) {
    return this.http.patch(`${this.baseUrl}/users/${id}`, patch);
  }
}
