import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { User } from '@models/user';
import { DataService } from '@services/common/data.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  readonly #dataService = inject(DataService);

  readonly #baseUrl = 'http://localhost:3000/users';

  public deleteUser(id) {
    return this.#dataService.delete<User>(id, this.#baseUrl);
  }

  public getUser(id) {
    return this.#dataService.getById<User>(id, this.#baseUrl);
  }

  public loadUsers() {
    return this.#dataService.getAll<User[]>(`${this.#baseUrl}/users?_sort=name&_order=asc`);
  }

  public patchUser(id: number, patch: any) {
    return this.#dataService.patch<User>(id, patch, this.#baseUrl);
  }
}
