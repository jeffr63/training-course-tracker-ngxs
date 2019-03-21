import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PathsService } from './paths.service';
import { Path } from './paths';

const baseUrl = 'http://localhost:3000';

describe('PathsService', () => {
  let httpTestingController: HttpTestingController;
  let service: PathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PathsService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PathsService);
  });

  describe('add', () => {
    it('should return path passed, with a post call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };

      service.add(path).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths`);
      req.flush(path);
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
    });
  });

  describe('delete', () => {
    it('should return deleted path with a delete call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };

      service.delete(1).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths/1`);
      req.flush(path);
      expect(req.request.method).toBe('DELETE');
      httpTestingController.verify();
    });
  });

  describe('get', () => {
    it('should return requested path with a get call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };

      service.get(1).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths/1`);
      req.flush(path);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('load', () => {
    it('should return paths, with a get call to the correct URL', () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      service.load().subscribe((data: Path[]) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(paths);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths?_sort=name&_order=asc`);
      req.flush(paths);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('save, with id', () => {
    it('should return requested path with a put call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };

      service.save(path).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths/1`);
      req.flush(path);
      expect(req.request.method).toBe('PUT');
      httpTestingController.verify();
    });
  });

  describe('save, without id', () => {
    it('should return requested path with a post call to the correct URL', () => {
      const path = { id: null, name: 'ABC' };
      const returns = { id: 1, name: 'ABC' };

      service.save(path).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(returns);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths`);
      req.flush(returns);
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
    });
  });
});
