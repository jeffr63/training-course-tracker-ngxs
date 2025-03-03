import { TestBed } from '@angular/core/testing';

import { DataService } from '@services/common/data.service';
import { Source } from '@models/sources';
import { SourceDataService } from './source-data.service';
import { of } from 'rxjs';

const baseUrl = 'http://localhost:3000/sources';

describe('SourcesService', () => {
  let service: SourceDataService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataService', ['add', 'delete', 'getById', 'getAll', 'update']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [SourceDataService, { provide: DataService, useValue: spy }],
    });

    service = TestBed.inject(SourceDataService);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  describe('deleteSource', () => {
    it('should return deleted source with a delete call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };
      dataServiceSpy.delete.and.returnValue(of(source));

      service.deleteSource(1).subscribe((data: Source) => {
        expect(dataServiceSpy.delete).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });
    });
  });

  describe('getSource', () => {
    it('should return requested source with a get call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };
      dataServiceSpy.getById.and.returnValue(of(source));

      service.getSource(1).subscribe((data: Source) => {
        expect(dataServiceSpy.getById).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });
    });
  });

  describe('loadSources', () => {
    it('should return sources, with a get call to the correct URL', () => {
      const sources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];
      dataServiceSpy.getAll.and.returnValue(of(sources));

      service.loadSources().subscribe((data: Source[]) => {
        expect(dataServiceSpy.getAll).toHaveBeenCalledWith(`${baseUrl}?_sort=name&_order=asc`);
        expect(data.length).toBe(2);
        expect(data).toEqual(sources);
      });
    });
  });

  describe('saveSource, with id', () => {
    it('should return requested source with a put call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };
      dataServiceSpy.update.and.returnValue(of(source));

      service.saveSource(source).subscribe((data: Source) => {
        expect(dataServiceSpy.update).toHaveBeenCalledWith(1, source, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(source);
      });
    });
  });

  describe('saveSource, without id', () => {
    it('should return requested source with a post call to the correct URL', () => {
      const source = { id: null, name: 'ABC' };
      const returns = { id: 1, name: 'ABC' };
      dataServiceSpy.add.and.returnValue(of(returns));

      service.saveSource(source).subscribe((data: Source) => {
        expect(dataServiceSpy.add).toHaveBeenCalledWith(source, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(returns);
      });
    });
  });
});
