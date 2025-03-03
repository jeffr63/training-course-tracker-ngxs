import { TestBed } from '@angular/core/testing';

import { PathDataService } from './path-data.service';
import { Path } from '@models/paths';
import { DataService } from '@services/common/data.service';
import { of } from 'rxjs';

const baseUrl = 'http://localhost:3000/paths';

describe('PathsService', () => {
  let service: PathDataService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataService', ['add', 'delete', 'getById', 'getAll', 'update']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [PathDataService, { provide: DataService, useValue: spy }],
    });

    service = TestBed.inject(PathDataService);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  describe('deletePath', () => {
    it('should return deleted path with a delete call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };
      dataServiceSpy.delete.and.returnValue(of(path));

      service.deletePath(1).subscribe((data: Path) => {
        expect(dataServiceSpy.delete).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });
    });
  });

  describe('getPath', () => {
    it('should return requested path with a get call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };
      dataServiceSpy.getById.and.returnValue(of(path));

      service.getPath(1).subscribe((data: Path) => {
        expect(dataServiceSpy.getById).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });
    });
  });

  describe('loadPaths', () => {
    it('should return paths, with a get call to the correct URL', () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];
      const url = `${baseUrl}?_sort=name&_order=asc`;
      dataServiceSpy.getAll.and.returnValue(of(paths));

      service.loadPaths().subscribe((data: Path[]) => {
        expect(dataServiceSpy.getAll).toHaveBeenCalledWith(url);
        expect(data.length).toBe(2);
        expect(data).toEqual(paths);
      });
    });
  });

  describe('savePath, with id', () => {
    it('should return requested path with a put call to the correct URL', () => {
      const path = { id: 1, name: 'ABC' };
      dataServiceSpy.update.and.returnValue(of(path));

      service.savePath(path).subscribe((data: Path) => {
        expect(dataServiceSpy.update).toHaveBeenCalledWith(1, path, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(path);
      });
    });
  });

  describe('savePath, without id', () => {
    it('should return requested path with a post call to the correct URL', () => {
      const path = { id: null, name: 'ABC' };
      const returns = { id: 1, name: 'ABC' };
      dataServiceSpy.add.and.returnValue(of(returns));

      service.savePath(path).subscribe((data: Path) => {
        expect(dataServiceSpy.add).toHaveBeenCalledWith(path, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(returns);
      });
    });
  });
});
