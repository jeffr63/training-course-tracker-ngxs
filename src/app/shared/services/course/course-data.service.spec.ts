import { TestBed } from '@angular/core/testing';

import { Course } from '@models/course';
import { CourseDataService } from './course-data.service';
import { DataService } from '@services/common/data.service';
import { of } from 'rxjs';

const baseUrl = 'http://localhost:3000/courses';

describe('CourseService', () => {
  let service: CourseDataService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataService', ['add', 'delete', 'getById', 'getAll', 'update']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [CourseDataService, { provide: DataService, useValue: spy }],
    });

    service = TestBed.inject(CourseDataService);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  describe('deleteCourse', () => {
    it('should return deleted course with a delete call to the correct URL', () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      dataServiceSpy.delete.and.returnValue(of(course));

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
      dataServiceSpy.getById.and.returnValue(of(course));

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
      dataServiceSpy.getAll.and.returnValue(of(courses));

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
      dataServiceSpy.getAll.and.returnValues(of(courses));
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
      dataServiceSpy.getAll.and.returnValues(of(courses));
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
      dataServiceSpy.update.and.returnValue(of(course));

      service.saveCourse(course).subscribe((data: Course) => {
        expect(dataServiceSpy.update).toHaveBeenCalledOnceWith(1, course, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(course);
      });
    });
  });

  describe('saveCourse, without id', () => {
    it('should return requested course with a post call to the correct URL', () => {
      const course = { id: null, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      const result = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      dataServiceSpy.add.and.returnValue(of(result));

      service.saveCourse(course).subscribe((data: Course) => {
        expect(dataServiceSpy.add).toHaveBeenCalledWith(course, baseUrl);
        expect(data.id).toBe(1);
        expect(data).toEqual(result);
      });
    });
  });
});
