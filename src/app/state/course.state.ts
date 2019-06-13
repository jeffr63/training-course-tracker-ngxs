import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Course, CourseData } from '../shared/course';
import { CoursesService } from '../services/courses.service';
import {
  Delete, DeleteSuccess, DeleteFail,
  GetCourse, GetCourseSuccess, GetCourseFail,
  GetCourseData, GetPage, NewCourse,
  Load, LoadSuccess, LoadFail,
  Save, SaveSuccess, SaveFail,
} from './course.actions';

export interface CoursesStateModel {
  courses: Course[];
  coursesByPath: CourseData[],
  coursesBySource: CourseData[]
  currentCourse: Course;
  pagedCourses: Course[];
  totalCourses: number;
  error: string;
}

@State<CoursesStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    coursesByPath: [],
    coursesBySource: [],
    currentCourse: null,
    pagedCourses: [],
    totalCourses: 0,
    error: '',
  }
})
export class CoursesState {

  constructor(private coursesService: CoursesService) { }

  @Selector()
  static getCourse(state: CoursesStateModel) {
    return state.currentCourse;
  }

  @Selector()
  static getCourses(state: CoursesStateModel) {
    return state.courses;
  }

  @Selector()
  static getCoursesByPath(state: CoursesStateModel) {
    return state.coursesByPath;
  }

  @Selector()
  static getCoursesBySource(state: CoursesStateModel) {
    return state.coursesBySource;
  }

  @Selector()
  static getError(state: CoursesStateModel) {
    return state.error;
  }

  @Selector()
  static getPagedCourses(state: CoursesStateModel) {
    return state.pagedCourses;
  }

  @Selector()
  static getTotalCourses(state: CoursesStateModel) {
    return state.totalCourses;
  }

  @Action(Delete)
  public delete({ dispatch, patchState }: StateContext<CoursesStateModel>, { payload }: Delete) {
    patchState({
      error: ''
    });
    return this.coursesService.deleteCourse(payload.id).pipe(
      map(_course => {
        dispatch(new Load()).subscribe(() => {
          dispatch(new GetPage({ 'current': payload.current, 'pageSize': payload.pageSize }))
        });
        return dispatch(new DeleteSuccess());
      }),
      catchError(error => {
        return dispatch(new DeleteFail(error));
      })
    );
  }

  @Action(DeleteFail)
  public deleteFail({ patchState }: StateContext<CoursesStateModel>, { payload }: DeleteFail) {
    patchState({
      error: payload
    });
  }

  @Action(DeleteSuccess)
  public deleteSuccess({ patchState }: StateContext<CoursesStateModel>) {
    patchState({
      error: ''
    });
  }

  @Action(GetCourse)
  public getCourse({ dispatch, patchState }: StateContext<CoursesStateModel>, { payload }: GetCourse) {
    patchState({
      error: ''
    });
    return this.coursesService.getCourse(payload).pipe(
      map(course => {
        return dispatch(new GetCourseSuccess(course));
      }),
      catchError(error => {
        return dispatch(new GetCourseFail(error));
      })
    );
  }

  @Action(GetCourseFail)
  public getCourseFail({ patchState }: StateContext<CoursesStateModel>, { payload }: GetCourseFail) {
    patchState({
      currentCourse: null,
      error: payload
    });
  }

  @Action(GetCourseSuccess)
  public getCourseSuccess({ patchState }: StateContext<CoursesStateModel>, { payload }: GetCourseSuccess) {
    patchState({
      currentCourse: payload,
      error: ''
    });
  }

  @Action(GetCourseData)
  public getCourseData({ getState, patchState }: StateContext<CoursesStateModel>) {
    const state = getState();
    const courses = [...state.courses];
    let byPath = _.chain(courses)
      .groupBy('path')
      .map((values, key) => {
        return {
          'name': key,
          'value': _.reduce(values, function (value, number) {
            return value + 1
          }, 0)
        }
      })
      .value();
    byPath = _.orderBy(byPath, 'value', 'desc');

    let bySource = _.chain(courses)
      .groupBy('source')
      .map((values, key) => {
        return {
          'name': key,
          'value': _.reduce(values, function (value, number) {
            return value + 1
          }, 0)
        }
      })
      .value();
    bySource = _.orderBy(bySource, 'value', 'desc');
    patchState({
      coursesByPath: byPath,
      coursesBySource: bySource,
    })
  }

  @Action(GetPage)
  public getPage({ getState, patchState }: StateContext<CoursesStateModel>, { payload }: GetPage) {
    const state = getState();
    const offset = (payload.current - 1) * payload.pageSize;
    const courses = [...state.courses];
    const pagedItems = _.drop(courses, offset).slice(0, payload.pageSize);
    patchState({
      pagedCourses: pagedItems
    });
  }

  @Action(Load)
  public load({ dispatch, patchState }: StateContext<CoursesStateModel>) {
    patchState({
      error: ''
    });
    return this.coursesService.getCoursesSorted().pipe(
      map((courses: Course[]) => {
        return dispatch(new LoadSuccess(courses));
      }),
      catchError(error => {
        return dispatch(new LoadFail(error));
      })
    );
  }

  @Action(LoadFail)
  public loadFail({ patchState }: StateContext<CoursesStateModel>, { payload }: LoadFail) {
    patchState({
      courses: [],
      pagedCourses: [],
      coursesByPath: [],
      coursesBySource: [],
      error: payload
    });
  }

  @Action(LoadSuccess)
  public loadSuccess({ patchState }: StateContext<CoursesStateModel>, { payload }: LoadSuccess) {
    patchState({
      courses: payload,
      totalCourses: payload.length,
      error: ''
    });
  }

  @Action(NewCourse)
  public newCourse({ patchState }: StateContext<CoursesStateModel>) {
    const initCourse = {
      id: null,
      title: '',
      instructor: '',
      path: '',
      source: ''
    };
    patchState({
      currentCourse: initCourse
    });
  }

  @Action(Save)
  public save({ dispatch, getState, patchState }: StateContext<CoursesStateModel>) {
    patchState({
      error: ''
    });
    const state = getState();
    return this.coursesService.saveCourse(state.currentCourse).pipe(
      map((course: Course) => {
        return dispatch(new SaveSuccess(course));
      }),
      catchError(error => {
        return dispatch(new SaveFail(error));
      })
    );
  }

  @Action(SaveFail)
  public saveFail({ patchState }: StateContext<CoursesStateModel>, { payload }: SaveFail) {
    patchState({
      courses: [],
      error: payload
    });
  }

  @Action(SaveSuccess)
  public saveSuccess({ getState, patchState }: StateContext<CoursesStateModel>, { payload }: SaveSuccess) {
    const state = getState();
    const updatedCourses = state.courses.map(
      item => payload.id === item.id ? payload : item);
    const updatePageCourses = state.pagedCourses.map(
      item => payload.id === item.id ? payload : item);
    patchState({
      courses: updatedCourses,
      currentCourse: null,
      pagedCourses: updatePageCourses,
      error: ''
    });
  }

}
