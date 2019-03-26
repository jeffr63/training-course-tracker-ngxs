import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store } from '@ngxs/store';

import { CoursesState, CoursesStateModel } from './course.state';
import { CoursesService } from './../courses.service';
import { Course } from './../course';
import {
  DeleteFail, DeleteSuccess, GetCourseFail, GetCourseSuccess, GetTotalFail, GetTotalSuccess,
  LoadFail, LoadSuccess, NewCourse, SaveFail, SaveSuccess
} from './course.actions';

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
