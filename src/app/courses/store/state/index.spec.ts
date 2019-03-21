import { Course } from '../../course';
import * as fromMain from './index';
import * as fromCourses from './course.reducer';

describe(`Courses Main Reducers Selectors`, () => {

  describe(`getCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          currentCourse
        }
      };

      const payload = fromMain.getCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });

  describe(`saveCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B', yearCompleted: '2019' };
      const previousState = {
        courses: {
          ...fromCourses.initialState,
          currentCourse
        }
      };

      const payload = fromMain.saveCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });

  describe(`getTotalCourses selector`, () => {
    it('should return totalCourses', () => {
      const totalCourses = 10;
      const previousState = {
        courses: {
          courses: {
            ...fromCourses.initialState,
            totalCourses
          }
        }
      };

      const payload = fromMain.getTotalCourses(previousState);

      expect(payload).toEqual(totalCourses);
    });
  });
});
