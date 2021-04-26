import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PathsService } from './paths.service';
import { Path } from '../../shared/paths';

const baseUrl = 'http://localhost:3000';

describe('PathsService', () => {
  let httpTestingController: HttpTestingController;
  let service: PathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PathsService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PathsService);
  });

  describe('deletePath', () => {
    it('should return deleted path with a delete call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };

      service.deletePath(1).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths/1`);
      req.flush(path);
      expect(req.request.method).toBe('DELETE');
      httpTestingController.verify();
    });
  });

  describe('getPath', () => {
    it('should return requested path with a get call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };

      service.getPath(1).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths/1`);
      req.flush(path);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('loadPaths', () => {
    it('should return paths, with a get call to the correct URL', () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      service.loadPaths().subscribe((data: Path[]) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(paths);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths?_sort=name&_order=asc`);
      req.flush(paths);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('savePath, with id', () => {
    it('should return requested path with a put call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };

      service.savePath(path).subscribe((data: Path) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/paths/1`);
      req.flush(path);
      expect(req.request.method).toBe('PUT');
      httpTestingController.verify();
    });
  });

  describe('savePath, without id', () => {
    it('should return requested path with a post call to the correct URL', () => {
      const path = { id: null, name: 'ABC' };
      const returns = { id: 1, name: 'ABC' };

      service.savePath(path).subscribe((data: Path) => {
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
