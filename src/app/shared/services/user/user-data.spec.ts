import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { DataService } from '@services/common/data-service';
import { User } from '@models/user-interface';
import { UserData } from './user-data';

const baseUrl = 'http://localhost:3000/users';

describe('UsersService', () => {
  let service: UserData;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataService', ['add', 'delete', 'getById', 'getAll', 'patch']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [UserData, { provide: DataService, useValue: spy }],
    });

    service = TestBed.inject(UserData);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  describe('deleteUser', () => {
    it('should return deleted user with a delete call to the correct URL', () => {
      const user = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };
      dataServiceSpy.delete.and.returnValue(of(user));

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
      dataServiceSpy.getById.and.returnValue(of(user));

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
      dataServiceSpy.getAll.and.returnValue(of(users));

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
      dataServiceSpy.patch.and.returnValue(of(result));

      service.patchUser(1, patch).subscribe((data: User) => {
        expect(dataServiceSpy.patch).toHaveBeenCalledWith(1, patch, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(result);
      });
    });
  });
});
