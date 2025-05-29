import { Injectable, inject } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Course, CourseChartData } from '@models/course-interface';
import { CourseActions } from './course.actions';
import { CourseData } from '@services/course/course-data';

export interface CourseStateModel {
  courses: Course[];
  coursesByPath: CourseChartData[];
  coursesBySource: CourseChartData[];
  currentCourse: Course;
  pagedCourses: Course[];
  totalCourses: number;
  error: string;
}

@State<CourseStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    coursesByPath: [],
    coursesBySource: [],
    currentCourse: null,
    pagedCourses: [],
    totalCourses: 0,
    error: '',
  },
})
@Injectable()
export class CourseState {
  #courseDataService = inject(CourseData);

  @Selector([CourseState])
  static getCourse(state: CourseStateModel): Course {
    return state.currentCourse;
  }

  @Selector([CourseState])
  static getCourses(state: CourseStateModel): Course[] {
    return state.courses;
  }

  @Selector([CourseState])
  static getCoursesByPath(state: CourseStateModel): CourseChartData[] {
    return state.coursesByPath;
  }

  @Selector([CourseState])
  static getCoursesBySource(state: CourseStateModel): CourseChartData[] {
    return state.coursesBySource;
  }

  @Selector([CourseState])
  static getError(state: CourseStateModel): string {
    return state.error;
  }

  @Selector([CourseState])
  static getPagedCourses(state: CourseStateModel): Course[] {
    return state.pagedCourses;
  }

  @Selector([CourseState])
  static getTotalCourses(state: CourseStateModel): number {
    return state.totalCourses;
  }

  @Action(CourseActions.DeleteCourse)
  public delete({ dispatch, patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.DeleteCourse) {
    patchState({
      error: '',
    });
    return this.#courseDataService.deleteCourse(payload.id).pipe(
      map((_course) => {
        dispatch(new CourseActions.LoadCourses()).subscribe(() => {
          dispatch(
            new CourseActions.GetCoursesPage({
              current: payload.current,
              pageSize: payload.pageSize,
            })
          );
        });
        return dispatch(new CourseActions.DeleteCourseSuccess());
      }),
      catchError((error) => {
        return dispatch(new CourseActions.DeleteCourseFail(error));
      })
    );
  }

  @Action(CourseActions.DeleteCourseFail)
  public deleteFail({ patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.DeleteCourseFail) {
    patchState({
      error: payload,
    });
  }

  @Action(CourseActions.DeleteCourseSuccess)
  public deleteSuccess({ patchState }: StateContext<CourseStateModel>) {
    patchState({
      error: '',
    });
  }

  @Action(CourseActions.GetCourse)
  public getCourse({ dispatch, patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.GetCourse) {
    patchState({
      error: '',
    });
    return this.#courseDataService.getCourse(payload).pipe(
      map((course) => {
        return dispatch(new CourseActions.GetCourseSuccess(course));
      }),
      catchError((error) => {
        return dispatch(new CourseActions.GetCourseFail(error));
      })
    );
  }

  @Action(CourseActions.GetCourseFail)
  public getCourseFail({ patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.GetCourseFail) {
    patchState({
      currentCourse: null,
      error: payload,
    });
  }

  @Action(CourseActions.GetCourseSuccess)
  public getCourseSuccess({ patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.GetCourseSuccess) {
    patchState({
      currentCourse: payload,
      error: '',
    });
  }

  @Action(CourseActions.GetCourseData)
  public getCourseData({ getState, patchState }: StateContext<CourseStateModel>) {
    const state = getState();
    const courses = [...state.courses];
    let byPath = _.chain(courses)
      .groupBy('path')
      .map((values, key) => {
        return {
          name: key,
          value: _.reduce(
            values,
            function (value, number) {
              return value + 1;
            },
            0
          ),
        };
      })
      .value();
    byPath = _.orderBy(byPath, 'value', 'desc');

    let bySource = _.chain(courses)
      .groupBy('source')
      .map((values, key) => {
        return {
          name: key,
          value: _.reduce(
            values,
            function (value, number) {
              return value + 1;
            },
            0
          ),
        };
      })
      .value();
    bySource = _.orderBy(bySource, 'value', 'desc');
    patchState({
      coursesByPath: byPath,
      coursesBySource: bySource,
    });
  }

  @Action(CourseActions.GetCoursesPage)
  public getPage({ getState, patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.GetCoursesPage) {
    const state = getState();
    const offset = (payload.current - 1) * payload.pageSize;
    const courses = [...state.courses];
    const pagedItems = _.drop(courses, offset).slice(0, payload.pageSize);
    patchState({
      pagedCourses: pagedItems,
    });
  }

  @Action(CourseActions.LoadCourses)
  public load({ dispatch, patchState }: StateContext<CourseStateModel>) {
    patchState({
      error: '',
    });
    return this.#courseDataService.getCoursesSorted().pipe(
      map((courses: Course[]) => {
        return dispatch(new CourseActions.LoadCoursesSuccess(courses));
      }),
      catchError((error) => {
        return dispatch(new CourseActions.LoadCoursesFail(error));
      })
    );
  }

  @Action(CourseActions.LoadCoursesFail)
  public loadFail({ patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.LoadCoursesFail) {
    patchState({
      courses: [],
      pagedCourses: [],
      coursesByPath: [],
      coursesBySource: [],
      error: payload,
    });
  }

  @Action(CourseActions.LoadCoursesSuccess)
  public loadSuccess({ patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.LoadCoursesSuccess) {
    patchState({
      courses: payload,
      totalCourses: payload.length,
      error: '',
    });
  }

  @Action(CourseActions.NewCourse)
  public newCourse({ patchState }: StateContext<CourseStateModel>) {
    const initCourse = {
      id: null,
      title: '',
      instructor: '',
      path: '',
      source: '',
    };
    patchState({
      currentCourse: initCourse,
    });
  }

  @Action(CourseActions.SaveCourse)
  public save({ dispatch, patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.SaveCourse) {
    patchState({
      error: '',
    });
    return this.#courseDataService.saveCourse(payload).pipe(
      map((course: Course) => {
        return dispatch(new CourseActions.SaveCourseSuccess(course));
      }),
      catchError((error) => {
        return dispatch(new CourseActions.SaveCourseFail(error));
      })
    );
  }

  @Action(CourseActions.SaveCourseFail)
  public saveFail({ patchState }: StateContext<CourseStateModel>, { payload }: CourseActions.SaveCourseFail) {
    patchState({
      courses: [],
      error: payload,
    });
  }

  @Action(CourseActions.SaveCourseSuccess)
  public saveSuccess(
    { getState, patchState }: StateContext<CourseStateModel>,
    { payload }: CourseActions.SaveCourseSuccess
  ) {
    const state = getState();
    const updatedCourses = state.courses.map((item) => (payload.id === item.id ? payload : item));
    const updatePageCourses = state.pagedCourses.map((item) => (payload.id === item.id ? payload : item));
    patchState({
      courses: updatedCourses,
      currentCourse: null,
      pagedCourses: updatePageCourses,
      error: '',
    });
  }
}
