import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { expect, it, describe, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { DataService } from '@services/common/data-service';
import { User } from '@models/user-interface';
import { UserData } from './user-data';

const baseUrl = 'http://localhost:3000/users';

describe('UsersService', () => {
  let service: UserData;
  let dataServiceSpy: MockedObject<DataService>;

  beforeEach(() => {
    const spy = {
      add: vi.fn().mockName('DataService.add'),
      delete: vi.fn().mockName('DataService.delete'),
      getById: vi.fn().mockName('DataService.getById'),
      getAll: vi.fn().mockName('DataService.getAll'),
      patch: vi.fn().mockName('DataService.patch'),
    };
    TestBed.configureTestingModule({
      imports: [],
      providers: [UserData, { provide: DataService, useValue: spy }],
    });

    service = TestBed.inject(UserData);
    dataServiceSpy = TestBed.inject(DataService) as MockedObject<DataService>;
  });

  describe('deleteUser', () => {
    it('should return deleted user with a delete call to the correct URL', () => {
      const user = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      dataServiceSpy.delete.mockReturnValue(of(user));

      service.deleteUser(1).subscribe((data: User) => {
        expect(dataServiceSpy.delete).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(user);
      });
    });
  });

  describe('getUser', () => {
    it('should return requested user with a get call to the correct URL', () => {
      const user = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      dataServiceSpy.getById.mockReturnValue(of(user));

      service.getUser(1).subscribe((data: User) => {
        expect(dataServiceSpy.getById).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(user);
      });
    });
  });

  describe('loadUsers', () => {
    it('should return users, with a get call to the correct URL', () => {
      const users = [
        { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' },
        { id: 2, name: 'Sam', email: 'sam@joe.com', password: 'abc', role: 'user' },
      ];
      dataServiceSpy.getAll.mockReturnValue(of(users));

      service.loadUsers().subscribe((data: User[]) => {
        expect(dataServiceSpy.getAll).toHaveBeenCalledWith(`${baseUrl}?_sort=name&_order=asc`);
        expect(data.length).toBe(2);
        expect(data).toEqual(users);
      });
    });
  });

  describe('patchUser, with id', () => {
    it('should return requested user with a put call to the correct URL', () => {
      const patch = { name: 'Jim' };
      const result = { id: 1, name: 'Jim', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      dataServiceSpy.patch.mockReturnValue(of(result));

      service.patchUser(1, patch).subscribe((data: User) => {
        expect(dataServiceSpy.patch).toHaveBeenCalledWith(1, patch, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(result);
      });
    });
  });
});
