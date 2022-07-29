import { Injectable } from '@angular/core';

import { Course } from '../models/course';
import { CoursesService } from './courses/courses.service';
import { Path } from '../models/paths';
import { PathsService } from './paths/paths.service';
import { Source } from '../models/sources';
import { SourcesService } from './sources/sources.service';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root',
})
export class DataServiceFacade {
  constructor(
    private coursesService: CoursesService,
    private pathsService: PathsService,
    private sourcesService: SourcesService,
    private usersService: UsersService
  ) {}

  // course service methods
  deleteCourse(id) {
    return this.coursesService.deleteCourse(id);
  }

  getCourse(id) {
    return this.coursesService.getCourse(id);
  }

  getCourses() {
    return this.coursesService.getCourses();
  }

  getCoursesSorted() {
    return this.coursesService.getCoursesSorted();
  }

  getCoursesPaged(current, pageSize) {
    return this.coursesService.getCoursesPaged(current, pageSize);
  }

  saveCourse(course: Course) {
    return this.coursesService.saveCourse(course);
  }

  // paths service methods
  deletePath(id) {
    return this.pathsService.deletePath(id);
  }

  getPath(id) {
    return this.pathsService.getPath(id);
  }

  loadPaths() {
    return this.pathsService.loadPaths();
  }

  savePath(path: Path) {
    return this.pathsService.savePath(path);
  }

  // source service methods
  deleteSource(id) {
    return this.sourcesService.deleteSource(id);
  }

  getSource(id) {
    return this.sourcesService.getSource(id);
  }

  loadSources() {
    return this.sourcesService.loadSources();
  }

  saveSource(source: Source) {
    return this.sourcesService.saveSource(source);
  }

  // user service methods
  deleteUser(id) {
    return this.usersService.deleteUser(id);
  }

  getUser(id) {
    return this.usersService.getUser(id);
  }

  loadUsers() {
    return this.usersService.loadUsers();
  }

  patchUser(id: number, patch: any) {
    return this.usersService.patchUser(id, patch);
  }
}
