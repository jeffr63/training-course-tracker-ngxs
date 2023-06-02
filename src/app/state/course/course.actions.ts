import { Course } from '../../shared/models/course';

export namespace CourseActions {
  export class DeleteCourse {
    static readonly type = '[Courses] Delete Course';
    constructor(public payload: { id: number; current: number; pageSize: number }) {}
  }

  export class DeleteCourseFail {
    static readonly type = '[Courses] Delete Course Fail';
    constructor(public payload: string) {}
  }

  export class DeleteCourseSuccess {
    static readonly type = '[Courses] Delete Course Success';
  }

  export class GetCourse {
    static readonly type = '[Courses] Get Course';
    constructor(public payload: number) {}
  }

  export class GetCourseFail {
    static readonly type = '[Courses] Get Course Fail';
    constructor(public payload: string) {}
  }

  export class GetCourseSuccess {
    static readonly type = '[Courses] Get Course Success';
    constructor(public payload: Course) {}
  }

  export class GetCourseData {
    static readonly type = '[Courses] Get Courses Data';
  }

  export class GetCoursesPage {
    static readonly type = '[Courses] Get Page';
    constructor(public payload: { current: number; pageSize: number }) {}
  }

  export class LoadCourses {
    static readonly type = '[Courses] Load Courses';
  }

  export class LoadCoursesFail {
    static readonly type = '[Courses] Load Courses Fail';
    constructor(public payload: string) {}
  }

  export class LoadCoursesSuccess {
    static readonly type = '[Courses] Load Courses Success';
    constructor(public payload: Course[]) {}
  }

  export class NewCourse {
    static readonly type = '[Courses] New Course';
  }

  export class SaveCourse {
    static readonly type = '[Courses] Save Course';
    constructor(public payload: Course) {}
  }

  export class SaveCourseFail {
    static readonly type = '[Courses] Save Course Fail';
    constructor(public payload: string) {}
  }

  export class SaveCourseSuccess {
    static readonly type = '[Courses] Save Course Success';
    constructor(public payload: Course) {}
  }
}
