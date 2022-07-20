import { Injectable, Injector } from '@angular/core';

import { Course } from '../models/course';
import { CoursesService } from './courses/courses.service';
import { Path } from '../models/paths';
import { PathsService } from './paths/paths.service';
import { Source } from '../models/sources';
import { SourcesService } from './sources/sources.service';
import { UsersService } from './users/users.service';

@Injectable()
export class DataServiceFacade {
  private _coursesService: CoursesService;
  public get coursesService(): CoursesService {
    if (!this._coursesService) {
      this._coursesService = this.injector.get(CoursesService);
    }
    return this._coursesService;
  }

  private _pathsService: PathsService;
  public get pathsService(): PathsService {
    if (!this._pathsService) {
      this._pathsService = this.injector.get(PathsService);
    }
    return this._pathsService;
  }

  private _sourcesService: SourcesService;
  public get sourcesService(): SourcesService {
    if (!this._sourcesService) {
      this._sourcesService = this.injector.get(SourcesService);
    }
    return this._sourcesService;
  }

  private _usersService: UsersService;
  public get usersService(): UsersService {
    if (!this._sourcesService) {
      this._usersService = this.injector.get(UsersService);
    }
    return this._usersService;
  }

  constructor(private injector: Injector) {}

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
