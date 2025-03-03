import { Injectable, inject } from '@angular/core';

import { Course } from '@models/course';
import { DataService } from '@services/common/data.service';

@Injectable({
  providedIn: 'root',
})
export class CourseDataService {
  readonly #dataService = inject(DataService);

  readonly #baseUrl = 'http://localhost:3000/courses';

  private addCourse(course: Course) {
    return this.#dataService.add<Course>(course, this.#baseUrl);
  }

  public deleteCourse(id) {
    return this.#dataService.delete<Course>(id, this.#baseUrl);
  }

  public getCourse(id) {
    return this.#dataService.getById<Course>(id, this.#baseUrl);
  }

  public getCourses() {
    return this.#dataService.getAll<Course[]>(this.#baseUrl);
  }

  public getCoursesSorted() {
    return this.#dataService.getAll<Course[]>(`${this.#baseUrl}?_sort=title&_order=asc`);
  }

  public getCoursesPaged(current, pageSize) {
    return this.#dataService.getAll<Course[]>(
      `${this.#baseUrl}?_sort=title&_order=asc&_page=${current}&_limit=${pageSize}`
    );
  }

  public saveCourse(course: Course) {
    if (course.id) {
      return this.updateCourse(course);
    } else {
      return this.addCourse(course);
    }
  }

  private updateCourse(course: Course) {
    return this.#dataService.update<Course>(course.id, course, this.#baseUrl);
  }
}
