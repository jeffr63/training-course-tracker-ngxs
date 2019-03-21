import { reducer, initialState, getCourses, getError, getTotalCourses, getCurrentCourse } from './course.reducer';
import * as fromActions from '../actions/course.actions';
import { Course } from '../../course';

describe('Courses Reducer', () => {
  it('should return state when passed an undefined action', () => {
    const action = {} as any;
    const state = reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  describe('COURSE_FAIL action', () => {
    it(`should clear currentCourse and set error`, () => {
      const newState = {
        ...initialState,
        currentCourse: { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' }
      };
      const action = new fromActions.GetCourseFail('Error');
      const state = reducer(newState, action);

      expect(state.currentCourse).toEqual(null);
      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(newState.courses);
      expect(state.totalCourses).toEqual(newState.totalCourses);
    });
  });

  describe('COURSE_SUCCESS action', () => {
    it(`should clear error`, () => {
      const course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
      const action = new fromActions.GetCourseSuccess(course);
      const state = reducer(initialState, action);

      expect(state.currentCourse).toEqual(course);
      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe('DELETE_FAIL action', () => {
    it(`should set error`, () => {
      const action = new fromActions.DeleteFail('Error');
      const state = reducer(initialState, action);

      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe('DELETE_SUCCESS action', () => {
    it(`should clear error`, () => {
      const action = new fromActions.DeleteSuccess();
      const state = reducer(initialState, action);

      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe('LOAD_FAIL action', () => {
    it(`should populate courses from the array and clear error`, () => {
      const action = new fromActions.LoadFail('Error');
      const state = reducer(initialState, action);

      expect(state.courses).toEqual([]);
      expect(state.error).toEqual('Error');
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe('LOAD_SUCCESS action', () => {
    it(`should populate courses from the array`, () => {
      const courses: Course[] = [
        { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' },
        { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D' }
      ];
      const action = new fromActions.LoadSuccess(courses);
      const state = reducer(initialState, action);

      expect(state.courses).toEqual(courses);
      expect(state.error).toEqual('');
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe(`SAVE_FAIL action`, () => {
    it(`should set error`, () => {
      const action = new fromActions.SaveFail('Error');
      const state = reducer(initialState, action);

      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
      expect(state.totalCourses).toEqual(initialState.totalCourses);
    });
  });

  describe('SAVE action', () => {
    it(`should update courses array with saved course information and clear error`, () => {
      const newState = {
        ...initialState,
        courses: [
          { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' },
          { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D' }
        ]
      };
      const course = { id: 2, title: 'Update Course 2', instructor: 'John', path: 'A', source: 'D' };
      const action = new fromActions.SaveSuccess(course);
      const state = reducer(newState, action);

      expect(state.courses[0]).toEqual(newState.courses[0]);
      expect(state.courses[1]).toEqual(course);
      expect(state.error).toEqual('');
      expect(state.currentCourse).toEqual(newState.currentCourse);
      expect(state.totalCourses).toEqual(newState.totalCourses);
    });
  });

  describe('TOTAL_FAIL action', () => {
    it(`should set totalCourses to 0 and set error`, () => {
      const newState = {
        ...initialState,
        totalCourses: 10
      };
      const action = new fromActions.GetTotalFail('Error');
      const state = reducer(newState, action);

      expect(state.totalCourses).toBe(0);
      expect(state.error).toEqual('Error');
      expect(state.courses).toEqual(newState.courses);
      expect(state.currentCourse).toEqual(null);
    });
  });

  describe('TOTAL_SUCCESS action', () => {
    it(`should set totalCourses and clear error`, () => {
      const courses: Course[] = [
        { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' },
        { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D' }
      ];
      const action = new fromActions.GetTotalSuccess(courses);
      const state = reducer(initialState, action);

      expect(state.totalCourses).toEqual(2);
      expect(state.error).toEqual('');
      expect(state.courses).toEqual(initialState.courses);
      expect(state.currentCourse).toEqual(initialState.currentCourse);
    });
  });

});

describe(`Course Reducer Selectors`, () => {
  describe(`getCourses selector`, () => {
    it('should return courses', () => {
      const courses: Course[] = [
        { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' },
        { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D' }
      ];
      const previousState = {
        ...initialState,
        courses
      };

      const payload = getCourses(previousState);

      expect(payload).toEqual(courses);
    });
  });

  describe(`Courses Reducer Selectors`, () => {
    describe(`getCourses selector`, () => {
      it('should return courses', () => {
        const courses: Course[] = [
          { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' },
          { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D' }
        ];
        const previousState = {
          ...initialState,
          courses
        };

        const payload = getCourses(previousState);

        expect(payload).toEqual(courses);
      });
    });

    describe(`getError selector`, () => {
      it('should return error', () => {
        const error = 'Error';
        const previousState = {
          ...initialState,
          error
        };

        const payload = getError(previousState);

        expect(payload).toEqual(error);
      });
    });

    describe(`getCurrentCourse selector`, () => {
      it('should return course', () => {
        const currentCourse: Course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
        const previousState = {
          ...initialState,
          currentCourse
        };

        const payload = getCurrentCourse(previousState);

        expect(payload).toEqual(currentCourse);
      });
    });

    describe(`getTotalCourses selector`, () => {
      it('should return total', () => {
        const totalCourses = 10;
        const previousState = {
          ...initialState,
          totalCourses
        };

        const payload = getTotalCourses(previousState);

        expect(payload).toBe(totalCourses);
      });
    });
  });

});
