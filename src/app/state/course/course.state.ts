import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Course, CourseData } from '../../shared/course';
import { CourseActions } from './course.actions';
import { DataServiceFacade } from '../../services/data-service-facade';

export interface CoursesStateModel {
  courses: Course[];
  coursesByPath: CourseData[];
  coursesBySource: CourseData[];
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
  },
})
@Injectable()
export class CoursesState {
  constructor(private dataFacade: DataServiceFacade) {}

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

  @Action(CourseActions.DeleteCourse)
  public delete({ dispatch, patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.DeleteCourse) {
    patchState({
      error: '',
    });
    return this.dataFacade.deleteCourse(payload.id).pipe(
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
  public deleteFail({ patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.DeleteCourseFail) {
    patchState({
      error: payload,
    });
  }

  @Action(CourseActions.DeleteCourseSuccess)
  public deleteSuccess({ patchState }: StateContext<CoursesStateModel>) {
    patchState({
      error: '',
    });
  }

  @Action(CourseActions.GetCourse)
  public getCourse({ dispatch, patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.GetCourse) {
    patchState({
      error: '',
    });
    return this.dataFacade.getCourse(payload).pipe(
      map((course) => {
        return dispatch(new CourseActions.GetCourseSuccess(course));
      }),
      catchError((error) => {
        return dispatch(new CourseActions.GetCourseFail(error));
      })
    );
  }

  @Action(CourseActions.GetCourseFail)
  public getCourseFail({ patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.GetCourseFail) {
    patchState({
      currentCourse: null,
      error: payload,
    });
  }

  @Action(CourseActions.GetCourseSuccess)
  public getCourseSuccess(
    { patchState }: StateContext<CoursesStateModel>,
    { payload }: CourseActions.GetCourseSuccess
  ) {
    patchState({
      currentCourse: payload,
      error: '',
    });
  }

  @Action(CourseActions.GetCourseData)
  public getCourseData({ getState, patchState }: StateContext<CoursesStateModel>) {
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
  public getPage({ getState, patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.GetCoursesPage) {
    const state = getState();
    const offset = (payload.current - 1) * payload.pageSize;
    const courses = [...state.courses];
    const pagedItems = _.drop(courses, offset).slice(0, payload.pageSize);
    patchState({
      pagedCourses: pagedItems,
    });
  }

  @Action(CourseActions.LoadCourses)
  public load({ dispatch, patchState }: StateContext<CoursesStateModel>) {
    patchState({
      error: '',
    });
    return this.dataFacade.getCoursesSorted().pipe(
      map((courses: Course[]) => {
        return dispatch(new CourseActions.LoadCoursesSuccess(courses));
      }),
      catchError((error) => {
        return dispatch(new CourseActions.LoadCoursesFail(error));
      })
    );
  }

  @Action(CourseActions.LoadCoursesFail)
  public loadFail({ patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.LoadCoursesFail) {
    patchState({
      courses: [],
      pagedCourses: [],
      coursesByPath: [],
      coursesBySource: [],
      error: payload,
    });
  }

  @Action(CourseActions.LoadCoursesSuccess)
  public loadSuccess({ patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.LoadCoursesSuccess) {
    patchState({
      courses: payload,
      totalCourses: payload.length,
      error: '',
    });
  }

  @Action(CourseActions.NewCourse)
  public newCourse({ patchState }: StateContext<CoursesStateModel>) {
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
  public save({ dispatch, getState, patchState }: StateContext<CoursesStateModel>) {
    patchState({
      error: '',
    });
    const state = getState();
    return this.dataFacade.saveCourse(state.currentCourse).pipe(
      map((course: Course) => {
        return dispatch(new CourseActions.SaveCourseSuccess(course));
      }),
      catchError((error) => {
        return dispatch(new CourseActions.SaveCourseFail(error));
      })
    );
  }

  @Action(CourseActions.SaveCourseFail)
  public saveFail({ patchState }: StateContext<CoursesStateModel>, { payload }: CourseActions.SaveCourseFail) {
    patchState({
      courses: [],
      error: payload,
    });
  }

  @Action(CourseActions.SaveCourseSuccess)
  public saveSuccess(
    { getState, patchState }: StateContext<CoursesStateModel>,
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
