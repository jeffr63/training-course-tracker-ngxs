import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from '../users.service';
import { User } from '../../models/user';

const baseUrl = 'http://localhost:3000';

describe('UsersService', () => {
  let httpTestingController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
  });

  describe('deleteUser', () => {
    it('should return deleted user with a delete call to the correct URL', () => {
      const user = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };

      service.deleteUser(1).subscribe((data: User) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(user);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/users/1`);
      req.flush(user);
      expect(req.request.method).toBe('DELETE');
      httpTestingController.verify();
    });
  });

  describe('getUser', () => {
    it('should return requested user with a get call to the correct URL', () => {
      const user = { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' };

      service.getUser(1).subscribe((data: User) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(user);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/users/1`);
      req.flush(user);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('loadUsers', () => {
    it('should return users, with a get call to the correct URL', () => {
      const users = [
        { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' },
        { id: 2, name: 'Sam', email: 'sam@joe.com', password: 'abc', role: 'user' },
      ];

      service.loadUsers().subscribe((data: User[]) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(users);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/users?_sort=name&_order=asc`);
      req.flush(users);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('patchUser, with id', () => {
    it('should return requested user with a put call to the correct URL', () => {
      const patch = { name: 'Jim' };
      const result = { id: 1, name: 'Jim', email: 'joe@joe.com', password: 'abc', role: 'admin' };

      service.patchUser(1, patch).subscribe((data: User) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(result);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/users/1`);
      req.flush(result);
      expect(req.request.method).toBe('PATCH');
      httpTestingController.verify();
    });
  });
});
