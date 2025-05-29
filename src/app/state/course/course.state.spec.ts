import { TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { CourseState, CourseStateModel } from './course.state';
import { Course, CourseChartData } from '@models/course-interface';
import { CourseData } from '@services/course/course-data';
import { CourseActions } from './course.actions';

const courseArray: Course[] = [
  { id: 1, title: 'ABC', instructor: 'Bob', path: 'Test Path 1', source: 'Test Source 1' },
  { id: 2, title: 'DEF', instructor: 'Bob', path: 'Test Path 1', source: 'Test Source 2' },
  { id: 3, title: 'GHI', instructor: 'Bob', path: 'Test Path 2', source: 'Test Source 2' },
];

const byPathArray: CourseChartData[] = [
  { name: 'Test Path 1', value: 2 },
  { name: 'Test Path 2', value: 1 },
];

const bySourceArray: CourseChartData[] = [
  { name: 'Test Source 2', value: 2 },
  { name: 'Test Source 1', value: 1 },
];

const pagedCourseArray: Course[] = [
  { id: 1, title: 'ABC', instructor: 'Bob', path: 'Test Path 1', source: 'Test Source 1' },
  { id: 2, title: 'DEF', instructor: 'Bob', path: 'Test Path 1', source: 'Test Source 2' },
];

const currentCourse: Course = {
  id: 1,
  title: 'ABC',
  instructor: 'Bob',
  path: 'Test Path 1',
  source: 'Test Source 1',
};

interface AppModel {
  readonly courses: CourseStateModel;
}

describe('Courses', () => {
  let store: Store;
  let service: CourseData;
  let actions: Actions;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CourseState])],
      providers: [CourseData, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
    store = TestBed.inject(Store);
    service = TestBed.inject(CourseData);
    actions = TestBed.inject(Actions);
  }));

  it('should initialize values', () => {
    const coursesState: CourseStateModel = {
      courses: courseArray,
      coursesByPath: [],
      coursesBySource: [],
      pagedCourses: [],
      totalCourses: 0,
      error: '',
      currentCourse: null,
    };
    store.reset(coursesState);

    store
      .selectOnce((state: CourseStateModel) => state.courses)
      .subscribe((courses: Course[]) => {
        expect(courses).toEqual(courseArray);
      });
  });

  describe('Selectors', () => {
    describe('getCourse', () => {
      it('should return an object', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: currentCourse,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        expect(CourseState.getCourse(appState.courses)).toEqual(currentCourse);
      }));
    });

    describe('getCourses', () => {
      it('should return an array of Courses', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 3,
          },
        };
        store.reset(appState);

        expect(CourseState.getCourses(appState.courses)).toEqual(courseArray);
      }));
    });

    describe('getCoursesByPath', () => {
      it('should return an array', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: byPathArray,
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        expect(CourseState.getCoursesByPath(appState.courses)).toEqual(byPathArray);
      }));
    });

    describe('getCoursesBySource', () => {
      it('should return an array', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: bySourceArray,
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        expect(CourseState.getCoursesBySource(appState.courses)).toEqual(bySourceArray);
      }));
    });

    describe('getError', () => {
      it('should return an string', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: 'Error',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        expect(CourseState.getError(appState.courses)).toEqual('Error');
      }));
    });

    describe('getPagedCourses', () => {
      it('should return an string', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: courseArray,
            totalCourses: 0,
          },
        };
        store.reset(appState);

        expect(CourseState.getPagedCourses(appState.courses)).toEqual(courseArray);
      }));
    });

    describe('getTotalCourses', () => {
      it('should return a number', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 3,
          },
        };
        store.reset(appState);

        expect(CourseState.getTotalCourses(appState.courses)).toEqual(3);
      }));
    });
  });

  describe('Action', () => {
    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', fakeAsync(() => {
        // arrange
        const action = new CourseActions.DeleteCourse({ id: 3, current: 1, pageSize: 10 });
        const expected = new CourseActions.DeleteCourseSuccess();
        const callbacksCalled = [];

        spyOn(service, 'deleteCourse').and.returnValue(of(currentCourse));
        spyOn(service, 'getCoursesSorted').and.returnValue(of(courseArray));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.DeleteCourseSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch DeleteFail when errors', fakeAsync(() => {
        const action = new CourseActions.DeleteCourse({ id: 3, current: 1, pageSize: 10 });
        const expected = new CourseActions.DeleteCourseFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'deleteCourse').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.DeleteCourseFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('DeleteFail', () => {
      it('should return string in Error', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            pagedCourses: [],
            error: '',
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.DeleteCourseFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses.error)
          .subscribe((error) => {
            expect(error).toEqual('Error');
          });
      }));
    });

    describe('DeleteSuccess', () => {
      it('should remove requested item from courses array', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: 'Error',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.DeleteCourseSuccess());

        store
          .selectOnce((state: AppModel) => state.courses.error)
          .subscribe((error) => {
            expect(error).toEqual('');
          });
      }));
    });

    describe('GetCourse', () => {
      it('should dispatch GetCourseSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new CourseActions.GetCourse(3);
        const expected = new CourseActions.GetCourseSuccess(currentCourse);
        const callbacksCalled = [];

        spyOn(service, 'getCourse').and.returnValue(of(currentCourse));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.GetCourseSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch GetCourseFail when errors', fakeAsync(() => {
        const action = new CourseActions.GetCourse(3);
        const expected = new CourseActions.GetCourseFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getCourse').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.GetCourseFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('GetCourseFail', () => {
      it('should return string in Error', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: currentCourse,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.GetCourseFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentCourse).toEqual(null);
          });
      }));
    });

    describe('GetCourseSuccess', () => {
      it('should set currentCourse with requested record and clear error', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: 'Error',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.GetCourseSuccess(currentCourse));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.currentCourse).toEqual(currentCourse);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('GetPage', () => {
      it('should update the pagedCourses with request page info ', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 3,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.GetCoursesPage({ current: 1, pageSize: 2 }));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.pagedCourses).toEqual(pagedCourseArray);
          });
      }));
    });

    describe('GetCourseData', () => {
      it('should update the coursesByPath and coursesBySource store values', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.GetCourseData());

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.coursesByPath).toEqual(byPathArray);
            expect(actual.coursesBySource).toEqual(bySourceArray);
          });
      }));
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new CourseActions.LoadCourses();
        const expected = new CourseActions.LoadCoursesSuccess(courseArray);
        const callbacksCalled = [];

        spyOn(service, 'getCoursesSorted').and.returnValue(of(courseArray));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.LoadCoursesSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch LoadFail when errors', fakeAsync(() => {
        const action = new CourseActions.LoadCourses();
        const expected = new CourseActions.LoadCoursesFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getCoursesSorted').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.LoadCoursesFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('LoadFail', () => {
      it('should return string in Error', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            coursesByPath: byPathArray,
            coursesBySource: bySourceArray,
            currentCourse: null,
            error: '',
            pagedCourses: pagedCourseArray,
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.LoadCoursesFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.courses.length).toEqual(0);
            expect(actual.coursesByPath.length).toEqual(0);
            expect(actual.coursesBySource.length).toEqual(0);
            expect(actual.pagedCourses.length).toEqual(0);
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('LoadSuccess', () => {
      it('should set the courses array to returned values and clear error', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: 'Error',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.LoadCoursesSuccess(courseArray));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.courses).toEqual(courseArray);
            expect(actual.totalCourses).toEqual(3);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('New Course', () => {
      it('should initialize currentCourse values for a new record', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        const expected: Course = { id: null, title: '', instructor: '', path: '', source: '' };

        store.dispatch(new CourseActions.NewCourse());

        store
          .selectOnce((state: AppModel) => state.courses.currentCourse)
          .subscribe((current) => {
            expect(current).toEqual(expected);
          });
      }));
    });

    describe('Save', () => {
      it('should dispatch SaveSuccuss when successful', fakeAsync(() => {
        // arrange
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: currentCourse,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);
        const action = new CourseActions.SaveCourse(currentCourse);
        const expected = new CourseActions.SaveCourseSuccess(currentCourse);
        const callbacksCalled = [];

        spyOn(service, 'saveCourse').and.returnValue(of(currentCourse));
        spyOn(service, 'getCourses').and.returnValue(of(courseArray));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.SaveCourseSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch SaveFail when errors', fakeAsync(() => {
        const action = new CourseActions.SaveCourse(currentCourse);
        const expected = new CourseActions.SaveCourseFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'saveCourse').and.returnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(CourseActions.SaveCourseFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('SaveFail', () => {
      it('should return string in Error', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: null,
            error: '',
            pagedCourses: [],
            totalCourses: 0,
          },
        };
        store.reset(appState);

        store.dispatch(new CourseActions.SaveCourseFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.courses.length).toBe(0);
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('SaveSuccess', () => {
      it('should update the course array with new value', waitForAsync(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            coursesByPath: [],
            coursesBySource: [],
            currentCourse: currentCourse,
            error: 'Error',
            pagedCourses: pagedCourseArray,
            totalCourses: 3,
          },
        };
        store.reset(appState);

        const expected: Course = { id: 2, title: 'XYZ', instructor: 'Joe', path: 'Updated', source: 'Updated' };
        store.dispatch(new CourseActions.SaveCourseSuccess(expected));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe((actual) => {
            expect(actual.courses.length).toEqual(courseArray.length);
            expect(actual.courses[1]).toEqual(expected);
            expect(actual.pagedCourses.length).toEqual(pagedCourseArray.length);
            expect(actual.pagedCourses[1]).toEqual(expected);
            expect(actual.error).toEqual('');
            expect(actual.currentCourse).toEqual(null);
          });
      }));
    });
  });
});
