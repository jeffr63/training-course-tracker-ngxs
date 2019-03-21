import { Course } from './../../course';

export enum CourseActionTypes {
  COURSE = '[Courses] Get Course',
  COURSE_SUCCESS = '[Courses] Get Course Success',
  COURSE_FAIL = '[Courses] Get Course Fail',

  DELETE = '[Courses] Delete Course',
  DELETE_SUCCESS = '[Courses] Delete Course Succes',
  DELETE_FAIL = '[Courses] Delete Course Fail',

  LOAD = '[Courses] Load Courses',
  LOAD_SUCCESS = '[Courses] Load Courses Success',
  LOAD_FAIL = '[Courses] Load Courses Fail',

  NEW_COURSE = '[Courses] New Course',

  SAVE = '[Courses] Save Course',
  SAVE_SUCCESS = '[Courses] Save Course Success',
  SAVE_FAIL = '[Courses] Save Course Fail',

  TOTAL = '[Courses] Get Total Courses',
  TOTAL_SUCCESS = '[Courses] Get Total Courses Success',
  TOTAL_FAIL = '[Courses] Get Total Courses Fail',
}

export class Delete {
  static readonly type = CourseActionTypes.DELETE;

  constructor(public payload: { 'id': number, 'current': number, 'pageSize': number }) { }
}

export class DeleteFail {
  static readonly type = CourseActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteSuccess {
  static readonly type = CourseActionTypes.DELETE_SUCCESS;
}

export class GetCourse {
  static readonly type = CourseActionTypes.COURSE;

  constructor(public payload: number) { }
}

export class GetCourseFail {
  static readonly type = CourseActionTypes.COURSE_FAIL;

  constructor(public payload: string) { }
}

export class GetCourseSuccess {
  static readonly type = CourseActionTypes.COURSE_SUCCESS;

  constructor(public payload: Course) { }
}

export class GetTotal {
  static readonly type = CourseActionTypes.TOTAL;
}

export class GetTotalFail {
  static readonly type = CourseActionTypes.TOTAL_FAIL;

  constructor(public payload: string) { }
}

export class GetTotalSuccess {
  static readonly type = CourseActionTypes.TOTAL_SUCCESS;

  constructor(public payload: number) { }
}

export class Load {
  static readonly type = CourseActionTypes.LOAD;

  constructor(public payload: { 'current': number, 'pageSize': number }) { }
}

export class LoadFail {
  static readonly type = CourseActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class LoadSuccess {
  static readonly type = CourseActionTypes.LOAD_SUCCESS;

  constructor(public payload: Course[]) { }
}

export class NewCourse {
  static readonly type = CourseActionTypes.NEW_COURSE;
}

export class Save {
  static readonly type = CourseActionTypes.SAVE;

  // constructor(public payload: Course) { }
}

export class SaveFail {
  static readonly type = CourseActionTypes.SAVE_FAIL;

  constructor(public payload: string) { }
}

export class SaveSuccess {
  static readonly type = CourseActionTypes.SAVE_SUCCESS;

  constructor(public payload: Course) { }
}
