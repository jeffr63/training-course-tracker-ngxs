import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SourcesService } from './sources.service';
import { Source } from '../shared/sources';

const baseUrl = 'http://localhost:3000';

describe('SourcesService', () => {
  let httpTestingController: HttpTestingController;
  let service: SourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SourcesService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SourcesService);
  });


  describe('add', () => {
    it('should return source passed, with a post call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };

      service.add(source).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources`);
      req.flush(source);
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
    });
  });

  describe('delete', () => {
    it('should return deleted source with a delete call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };

      service.delete(1).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources/1`);
      req.flush(source);
      expect(req.request.method).toBe('DELETE');
      httpTestingController.verify();
    });
  });

  describe('get', () => {
    it('should return requested source with a get call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };

      service.get(1).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources/1`);
      req.flush(source);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('load', () => {
    it('should return sources, with a get call to the correct URL', () => {
      const sources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      service.load().subscribe((data: Source[]) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(sources);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources?_sort=name&_order=asc`);
      req.flush(sources);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('save, with id', () => {
    it('should return requested source with a put call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };

      service.save(source).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources/1`);
      req.flush(source);
      expect(req.request.method).toBe('PUT');
      httpTestingController.verify();
    });
  });

  describe('save, without id', () => {
    it('should return requested source with a post call to the correct URL', () => {
      const source = { id: null, name: 'ABC' };
      const returns = { id: 1, name: 'ABC' };

      service.save(source).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(returns);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources`);
      req.flush(returns);
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
    });
  });
});
