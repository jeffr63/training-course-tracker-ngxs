import { Injectable, inject } from '@angular/core';

import { Course } from '@models/course';
import { CoursesService } from '@services/courses.service';
import { Path } from '@models/paths';
import { PathsService } from '@services/paths.service';
import { Source } from '@models/sources';
import { SourcesService } from '@services/sources.service';
import { UsersService } from '@services/users.service';

@Injectable({
  providedIn: 'root',
})
export class DataServiceFacade {
  readonly #coursesService = inject(CoursesService);
  readonly #pathsService = inject(PathsService);
  readonly #sourcesService = inject(SourcesService);
  readonly #usersService = inject(UsersService);

  // course service methods
  public deleteCourse(id) {
    return this.#coursesService.deleteCourse(id);
  }

  public getCourse(id) {
    return this.#coursesService.getCourse(id);
  }

  public getCourses() {
    return this.#coursesService.getCourses();
  }

  public getCoursesSorted() {
    return this.#coursesService.getCoursesSorted();
  }

  public getCoursesPaged(current, pageSize) {
    return this.#coursesService.getCoursesPaged(current, pageSize);
  }

  public saveCourse(course: Course) {
    return this.#coursesService.saveCourse(course);
  }

  // paths service methods
  public deletePath(id) {
    return this.#pathsService.deletePath(id);
  }

  public getPath(id) {
    return this.#pathsService.getPath(id);
  }

  public loadPaths() {
    return this.#pathsService.loadPaths();
  }

  public savePath(path: Path) {
    return this.#pathsService.savePath(path);
  }

  // source service methods
  public deleteSource(id) {
    return this.#sourcesService.deleteSource(id);
  }

  public getSource(id) {
    return this.#sourcesService.getSource(id);
  }

  public loadSources() {
    return this.#sourcesService.loadSources();
  }

  public saveSource(source: Source) {
    return this.#sourcesService.saveSource(source);
  }

  // user service methods
  public deleteUser(id) {
    return this.#usersService.deleteUser(id);
  }

  public getUser(id) {
    return this.#usersService.getUser(id);
  }

  public loadUsers() {
    return this.#usersService.loadUsers();
  }

  public patchUser(id: number, patch: any) {
    return this.#usersService.patchUser(id, patch);
  }
}
