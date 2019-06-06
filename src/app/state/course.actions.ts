import { Course } from '../shared/course';

export class Delete {
  static readonly type = '[Courses] Delete Course';
  constructor(public payload: { 'id': number, 'current': number, 'pageSize': number }) { }
}

export class DeleteFail {
  static readonly type = '[Courses] Delete Course Fail';
  constructor(public payload: string) { }
}

export class DeleteSuccess {
  static readonly type = '[Courses] Delete Course Success';
}

export class GetCourse {
  static readonly type = '[Courses] Get Course';
  constructor(public payload: number) { }
}

export class GetCourseFail {
  static readonly type = '[Courses] Get Course Fail';
  constructor(public payload: string) { }
}

export class GetCourseSuccess {
  static readonly type = '[Courses] Get Course Success';
  constructor(public payload: Course) { }
}

export class GetTotal {
  static readonly type = '[Courses] Get Total Courses';
}

export class GetTotalFail {
  static readonly type = '[Courses] Get Total Courses Fail';
  constructor(public payload: string) { }
}

export class GetTotalSuccess {
  static readonly type = '[Courses] Get Total Courses Success';
  constructor(public payload: number) { }
}

export class Load {
  static readonly type = '[Courses] Load Courses';
  constructor(public payload: { 'current': number, 'pageSize': number }) { }
}

export class LoadFail {
  static readonly type = '[Courses] Load Courses Fail';
  constructor(public payload: string) { }
}

export class LoadSuccess {
  static readonly type = '[Courses] Load Courses Success';
  constructor(public payload: Course[]) { }
}

export class NewCourse {
  static readonly type = '[Courses] New Course';
}

export class Save {
  static readonly type = '[Courses] Save Course';
  // constructor(public payload: Course) { }
}

export class SaveFail {
  static readonly type = '[Courses] Save Course Fail';
  constructor(public payload: string) { }
}

export class SaveSuccess {
  static readonly type = '[Courses] Save Course Success';
  constructor(public payload: Course) { }
}
