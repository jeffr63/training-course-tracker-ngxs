import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'http://localhost:3000';

  public deleteUser(id) {
    return this.#http.delete<User>(`${this.#baseUrl}/users/${id}`);
  }

  public getUser(id) {
    return this.#http.get<User>(`${this.#baseUrl}/users/${id}`);
  }

  public loadUsers() {
    return this.#http.get<User[]>(`${this.#baseUrl}/users?_sort=name&_order=asc`);
  }

  public patchUser(id: number, patch: any) {
    return this.#http.patch(`${this.#baseUrl}/users/${id}`, patch);
  }
}
