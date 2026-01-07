import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { expect, it, describe, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { PathData } from './path-data';
import { Path } from '@models/paths-interface';
import { DataService } from '@services/common/data-service';

const baseUrl = 'http://localhost:3000/paths';

describe('PathsService', () => {
    let service: PathData;
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
            providers: [PathData, { provide: DataService, useValue: spy }],
        });

        service = TestBed.inject(PathData);
        dataServiceSpy = TestBed.inject(DataService) as MockedObject<DataService>;
    });

    describe('deletePath', () => {
        it('should return deleted path with a delete call to the correct URL', () => {
            const path = { id: 1, name: 'ABC' };
            dataServiceSpy.delete.mockReturnValue(of(path));

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
            dataServiceSpy.getById.mockReturnValue(of(path));

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
            dataServiceSpy.getAll.mockReturnValue(of(paths));

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
            dataServiceSpy.update.mockReturnValue(of(path));

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
            dataServiceSpy.add.mockReturnValue(of(returns));

            service.savePath(path).subscribe((data: Path) => {
                expect(dataServiceSpy.add).toHaveBeenCalledWith(path, baseUrl);
                expect(data.id).toBe(1);
                expect(data).toEqual(returns);
            });
        });
    });
});
