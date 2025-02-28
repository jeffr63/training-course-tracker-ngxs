import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { SourcesDataService } from './source-data.service';
import { Source } from '@models/sources';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

describe('SourcesService', () => {
  let httpTestingController: HttpTestingController;
  let service: SourcesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [SourcesDataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SourcesDataService);
  });

  describe('deleteSource', () => {
    it('should return deleted source with a delete call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };

      service.deleteSource(1).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources/1`);
      req.flush(source);
      expect(req.request.method).toBe('DELETE');
      httpTestingController.verify();
    });
  });

  describe('getSource', () => {
    it('should return requested source with a get call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };

      service.getSource(1).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources/1`);
      req.flush(source);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('loadSources', () => {
    it('should return sources, with a get call to the correct URL', () => {
      const sources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      service.loadSources().subscribe((data: Source[]) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(sources);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources?_sort=name&_order=asc`);
      req.flush(sources);
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });

  describe('saveSource, with id', () => {
    it('should return requested source with a put call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };

      service.saveSource(source).subscribe((data: Source) => {
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/sources/1`);
      req.flush(source);
      expect(req.request.method).toBe('PUT');
      httpTestingController.verify();
    });
  });

  describe('saveSource, without id', () => {
    it('should return requested source with a post call to the correct URL', () => {
      const source = { id: null, name: 'ABC' };
      const returns = { id: 1, name: 'ABC' };

      service.saveSource(source).subscribe((data: Source) => {
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
