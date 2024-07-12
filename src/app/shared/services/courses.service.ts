import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '@models/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'http://localhost:3000';

  private addCourse(course: Course) {
    return this.#http.post(`${this.#baseUrl}/courses`, course);
  }

  public deleteCourse(id) {
    return this.#http.delete(`${this.#baseUrl}/courses/${id}`);
  }

  public getCourse(id) {
    return this.#http.get<Course>(`${this.#baseUrl}/courses/${id}`);
  }

  public getCourses() {
    return this.#http.get<Course[]>(`${this.#baseUrl}/courses`);
  }

  public getCoursesSorted() {
    return this.#http.get<Course[]>(`${this.#baseUrl}/courses?_sort=title&_order=asc`);
  }

  public getCoursesPaged(current, pageSize) {
    return this.#http.get<Course[]>(`${this.#baseUrl}/courses?_sort=title&_order=asc&_page=${current}&_limit=${pageSize}`);
  }

  public saveCourse(course: Course) {
    if (course.id) {
      return this.updateCourse(course);
    } else {
      return this.addCourse(course);
    }
  }

  private updateCourse(course: Course) {
    return this.#http.put(`${this.#baseUrl}/courses/${course.id}`, course);
  }
}
