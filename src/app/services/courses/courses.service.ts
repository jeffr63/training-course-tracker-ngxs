import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private addCourse(course: Course) {
    return this.http.post(`${this.baseUrl}/courses`, course);
  }

  deleteCourse(id) {
    return this.http.delete(`${this.baseUrl}/courses/${id}`);
  }

  getCourse(id) {
    return this.http.get<Course>(`${this.baseUrl}/courses/${id}`);
  }

  getCourses() {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  getCoursesSorted() {
    return this.http.get<Course[]>(`${this.baseUrl}/courses?_sort=title&_order=asc`);
  }

  getCoursesPaged(current, pageSize) {
    return this.http.get<Course[]>(
      `${this.baseUrl}/courses?_sort=title&_order=asc&_page=${current}&_limit=${pageSize}`
    );
  }

  saveCourse(course: Course) {
    if (course.id) {
      return this.updateCourse(course);
    } else {
      return this.addCourse(course);
    }
  }

  private updateCourse(course: Course) {
    return this.http.put(`${this.baseUrl}/courses/${course.id}`, course);
  }
}

