import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';

import { CoursesState, CoursesStateModel } from './course.state';
import { CoursesService } from './../courses.service';
import { Course } from './../course';
import {
  Delete, DeleteFail, DeleteSuccess, GetCourse, GetCourseFail, GetCourseSuccess, GetTotal, GetTotalFail, GetTotalSuccess,
  Load, LoadFail, LoadSuccess, NewCourse, Save, SaveFail, SaveSuccess
} from './course.actions';
import { of, throwError, Subscription } from 'rxjs';

const courseArray: Course[] = [
  { id: 1, title: 'ABC', instructor: 'Bob', path: 'Test Path', source: 'Test Source' },
  { id: 2, title: 'DEF', instructor: 'Bob', path: 'Test Path', source: 'Test Source' },
  { id: 3, title: 'GHI', instructor: 'Bob', path: 'Test Path', source: 'Test Source' }
];

const currentCourse = {
  id: 1, title: 'ABC', instructor: 'Bob', path: 'Test Path', source: 'Test Source'
};

interface AppModel {
  readonly courses: CoursesStateModel;
}

describe('courses', () => {
  let store: Store;
  let service: CoursesService;
  let actions: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([CoursesState]),
        HttpClientModule
      ],
      providers: []
    }).compileComponents();
    store = TestBed.get(Store);
    service = TestBed.get(CoursesService);
    actions = TestBed.get(Actions);
  }));

  it('should initialize values', () => {
    const coursesState: CoursesStateModel = {
      courses: courseArray,
      totalCourses: 0,
      error: '',
      currentCourse: null
    };
    store.reset(coursesState);

    store
      .selectOnce((state: CoursesStateModel) => state.courses)
      .subscribe((courses: Course[]) => {
        expect(courses).toEqual(courseArray);
      });
  });

  describe('Selector', () => {

    describe('getCourses', () => {

      it('should return an array of Courses', async(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            totalCourses: 3,
            error: '',
            currentCourse: null
          }
        };
        store.reset(appState);

        expect(CoursesState.getCourses(appState.courses)).toEqual(courseArray);
      }));
    });

    describe('getTotalCourses', () => {
      it('should return a number', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 3,
            error: '',
            currentCourse: null
          }
        };
        store.reset(appState);

        expect(CoursesState.getTotalCourses(appState.courses)).toEqual(3);
      }));
    });

    describe('getCourse', () => {
      it('should return an object', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: '',
            currentCourse: currentCourse
          }
        };
        store.reset(appState);

        expect(CoursesState.getCourse(appState.courses)).toEqual(currentCourse);
      }));
    });

    describe('getError', () => {
      it('should return an string', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: 'Error',
            currentCourse: null
          }
        };
        store.reset(appState);

        expect(CoursesState.getError(appState.courses)).toEqual('Error');
      }));
    });

  });

  describe('Action', () => {

    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', fakeAsync(() => {
        // arrange
        const action = new Delete({ id: 3, current: 1, pageSize: 10 });
        const expected = new DeleteSuccess();
        const callbacksCalled = [];

        spyOn(service, 'deleteCourse').and.returnValue(of(currentCourse));
        spyOn(service, 'getCoursesPaged').and.returnValue(of(courseArray));
        spyOn(service, 'getCourses').and.returnValue(of(courseArray));

        // action
        actions
          .pipe(ofActionSuccessful(DeleteSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch DeleteFail when errors', fakeAsync(() => {
        const action = new Delete({ id: 3, current: 1, pageSize: 10 });
        const expected = new DeleteFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'deleteCourse').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(DeleteFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('DeleteFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: '',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new DeleteFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses.error)
          .subscribe(error => {
            expect(error).toEqual('Error');
          });
      }));
    });

    describe('DeleteSuccess', () => {
      it('should remove requested item from courses array', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: 'Test',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new DeleteSuccess());

        store
          .selectOnce((state: AppModel) => state.courses.error)
          .subscribe(error => {
            expect(error).toEqual('');
          });
      }));
    });

    describe('GetCourse', () => {
      it('should dispatch GetCourseSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new GetCourse(3);
        const expected = new GetCourseSuccess(currentCourse);
        const callbacksCalled = [];

        spyOn(service, 'getCourse').and.returnValue(of(currentCourse));

        // action
        actions
          .pipe(ofActionSuccessful(GetCourseSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch GetCourseFail when errors', fakeAsync(() => {
        const action = new GetCourse(3);
        const expected = new GetCourseFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getCourse').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(GetCourseFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('GetCourseFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: '',
            currentCourse: currentCourse
          }
        };
        store.reset(appState);

        store.dispatch(new GetCourseFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentCourse).toEqual(null);
          });
      }));
    });

    describe('GetCourseSuccess', () => {
      it('should set currentCourse with requested record and clear error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: 'Test',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new GetCourseSuccess(currentCourse));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.currentCourse).toEqual(currentCourse);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('GetTotal', () => {
      it('should dispatch GetTotalSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new GetTotal();
        const expected = new GetTotalSuccess(3);
        const callbacksCalled = [];

        spyOn(service, 'getCourses').and.returnValue(of(courseArray));

        // action
        actions
          .pipe(ofActionSuccessful(GetTotalSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch GetTotalFail when errors', fakeAsync(() => {
        const action = new GetTotal();
        const expected = new GetTotalFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getCourses').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(GetTotalFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('GetTotalFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 3,
            error: '',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new GetTotalFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
            expect(actual.totalCourses).toEqual(0);
          });
      }));
    });

    describe('GetTotalSuccess', () => {
      it('should set totalCourses with payload and clear error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: 'Test',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new GetTotalSuccess(3));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.totalCourses).toEqual(3);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new Load({ current: 1, pageSize: 10 });
        const expected = new LoadSuccess(courseArray);
        const callbacksCalled = [];

        spyOn(service, 'getCoursesPaged').and.returnValue(of(courseArray));

        // action
        actions
          .pipe(ofActionSuccessful(LoadSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch LoadFail when errors', fakeAsync(() => {
        const action = new Load({ current: 1, pageSize: 10 });
        const expected = new LoadFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getCoursesPaged').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(LoadFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('LoadFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            totalCourses: 0,
            error: '',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new LoadFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.courses.length).toEqual(0);
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('LoadSuccess', () => {
      it('should set the courses array to returned values and clear error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: 'Test',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new LoadSuccess(courseArray));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.courses).toEqual(courseArray);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('New Course', () => {
      it('should initialize currentCourse values for a new record', async(() => {
        const appState: AppModel = {
          courses: {
            courses: [],
            totalCourses: 0,
            error: '',
            currentCourse: null
          }
        };
        store.reset(appState);

        const expected: Course = { id: null, title: '', instructor: '', path: '', source: '' };

        store.dispatch(new NewCourse());

        store
          .selectOnce((state: AppModel) => state.courses.currentCourse)
          .subscribe(current => {
            expect(current).toEqual(expected);
          });
      }));
    });

    describe('Save', () => {
      it('should dispatch SaveSuccuss when successful', fakeAsync(() => {
        // arrange
        const appState: AppModel = {
          courses: {
            courses: [],
            error: '',
            totalCourses: 0,
            currentCourse: currentCourse
          }
        };
        store.reset(appState);
        const action = new Save();
        const expected = new SaveSuccess(currentCourse);
        const callbacksCalled = [];

        spyOn(service, 'saveCourse').and.returnValue(of(currentCourse));
        spyOn(service, 'getCourses').and.returnValue(of(courseArray));

        // action
        actions
          .pipe(ofActionSuccessful(SaveSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch SaveFail when errors', fakeAsync(() => {
        const action = new Save();
        const expected = new SaveFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'saveCourse').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(SaveFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('SaveFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            totalCourses: 0,
            error: '',
            currentCourse: null
          }
        };
        store.reset(appState);

        store.dispatch(new SaveFail('Error'));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.courses.length).toBe(0);
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('SaveSuccess', () => {
      it('should update the course array with new value', async(() => {
        const appState: AppModel = {
          courses: {
            courses: courseArray,
            totalCourses: 3,
            error: 'Test',
            currentCourse: currentCourse
          }
        };
        store.reset(appState);

        const expected: Course = { id: 3, title: 'XYZ', instructor: 'Joe', path: 'Updated', source: 'Updated' };
        store.dispatch(new SaveSuccess(expected));

        store
          .selectOnce((state: AppModel) => state.courses)
          .subscribe(actual => {
            expect(actual.courses.length).toEqual(courseArray.length);
            expect(actual.courses[2]).toEqual(expected);
            expect(actual.error).toEqual('');
            expect(actual.currentCourse).toEqual(null);
          });
      }));
    });

  });

});
