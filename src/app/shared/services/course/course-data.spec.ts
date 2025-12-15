import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { expect, it, describe, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { Course } from '@models/course-interface';
import { CourseData } from './course-data';
import { DataService } from '@services/common/data-service';

const baseUrl = 'http://localhost:3000/courses';

describe('CourseService', () => {
  let service: CourseData;
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
      providers: [CourseData, { provide: DataService, useValue: spy }],
    });

    service = TestBed.inject(CourseData);
    dataServiceSpy = TestBed.inject(DataService) as MockedObject<DataService>;
  });

  describe('deleteCourse', () => {
    it('should return deleted course with a delete call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      dataServiceSpy.delete.mockReturnValue(of(course));

      service.deleteCourse(1).subscribe((data: Course) => {
        expect(dataServiceSpy.delete).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });
    });
  });

  describe('getCourse', () => {
    it('should return requested course with a get call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      dataServiceSpy.getById.mockReturnValue(of(course));

      service.getCourse(1).subscribe((data: Course) => {
        expect(dataServiceSpy.getById).toHaveBeenCalledWith(1, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });
    });
  });

  describe('getCourses', () => {
    it('should return courses with a get call to the correct URL', () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' },
        { id: 2, title: 'GHI', instructor: 'Jack', path: 'A', source: 'B' },
        { id: 3, title: 'DEF', instructor: 'Jim', path: 'A', source: 'B' },
      ];
      dataServiceSpy.getAll.mockReturnValue(of(courses));

      service.getCourses().subscribe((data: Course[]) => {
        expect(dataServiceSpy.getAll).toHaveBeenCalledWith(baseUrl);
        expect(data.length).toBe(3);
        expect(data[0].id).toBe(1);
        expect(data[1].id).toBe(2);
        expect(data[2].id).toBe(3);
        expect(data).toEqual(courses);
      });
    });
  });

  describe('getCoursesSorted', () => {
    it('should return courses, sorted ascending by title with a get call to the correct URL', () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' },
        { id: 3, title: 'DEF', instructor: 'Jim', path: 'A', source: 'B' },
        { id: 2, title: 'GHI', instructor: 'Jack', path: 'A', source: 'B' },
      ];
      dataServiceSpy.getAll.mockReturnValueOnce(of(courses));
      const url = `${baseUrl}?_sort=title&_order=asc`;

      service.getCoursesSorted().subscribe((data: Course[]) => {
        expect(dataServiceSpy.getAll).toHaveBeenCalledWith(url);
        expect(data.length).toBe(3);
        expect(data[0].id).toBe(1);
        expect(data[1].id).toBe(3);
        expect(data[2].id).toBe(2);
        expect(data).toEqual(courses);
      });
    });
  });

  describe('getCoursesPaged', () => {
    it('should return courses for the requested page and page size, sorted ascending by title with a get call to the correct URL', () => {
      const courses: Course[] = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' },
        { id: 3, title: 'DEF', instructor: 'Jim', path: 'A', source: 'B' },
        { id: 2, title: 'GHI', instructor: 'Jack', path: 'A', source: 'B' },
      ];
      dataServiceSpy.getAll.mockReturnValueOnce(of(courses));
      const current = 1;
      const pageSize = 3;
      const url = `${baseUrl}?_sort=title&_order=asc&_page=${current}&_limit=${pageSize}`;

      service.getCoursesPaged(current, pageSize).subscribe((data: Course[]) => {
        expect(dataServiceSpy.getAll).toHaveBeenCalledWith(url);
        expect(data.length).toBe(3);
        expect(data[0].id).toBe(1);
        expect(data[1].id).toBe(3);
        expect(data[2].id).toBe(2);
        expect(data).toEqual(courses);
      });
    });
  });

  describe('saveCourse, with id', () => {
    it('should return requested course with a put call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      dataServiceSpy.update.mockReturnValue(of(course));

      service.saveCourse(course).subscribe((data: Course) => {
        expect(dataServiceSpy.update).toHaveBeenCalledTimes(1);
        expect(dataServiceSpy.update).toHaveBeenCalledWith(1, course, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });
    });
  });

  describe('saveCourse, without id', () => {
    it('should return requested course with a post call to the correct URL', () => {
      const course = { id: null, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      const result = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      dataServiceSpy.add.mockReturnValue(of(result));

      service.saveCourse(course).subscribe((data: Course) => {
        expect(dataServiceSpy.add).toHaveBeenCalledWith(course, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(result);
      });
    });
  });
});
