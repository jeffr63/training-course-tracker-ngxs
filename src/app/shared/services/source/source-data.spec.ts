import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { expect, it, describe, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { DataService } from '@services/common/data-service';
import { Source } from '@models/sources-interface';
import { SourceData } from './source-data';

const baseUrl = 'http://localhost:3000/sources';

describe('SourcesService', () => {
  let service: SourceData;
  let dataServiceSpy: MockedObject<DataService>;

  beforeEach(() => {
    const spy = {
      add: vi.fn().mockName('DataService.add'),
      delete: vi.fn().mockName('DataService.delete'),
      getById: vi.fn().mockName('DataService.getById'),
      getAll: vi.fn().mockName('DataService.getAll'),
      update: vi.fn().mockName('DataService.update'),
    };
    TestBed.configureTestingModule({
      imports: [],
      providers: [SourceData, { provide: DataService, useValue: spy }],
    });

    service = TestBed.inject(SourceData);
    dataServiceSpy = TestBed.inject(DataService) as MockedObject<DataService>;
  });

  describe('deleteSource', () => {
    it('should return deleted source with a delete call to the correct URL', () => {
      const source = { id: 1, name: 'ABC' };
      dataServiceSpy.delete.mockReturnValue(of(source));

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
      dataServiceSpy.getById.mockReturnValue(of(source));

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
      dataServiceSpy.getAll.mockReturnValue(of(sources));

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
      dataServiceSpy.update.mockReturnValue(of(source));

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
      dataServiceSpy.add.mockReturnValue(of(returns));

      service.saveSource(source).subscribe((data: Source) => {
        expect(dataServiceSpy.add).toHaveBeenCalledWith(source, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(returns);
      });
    });
  });
});
