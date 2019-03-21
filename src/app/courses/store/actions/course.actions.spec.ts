import * as fromActions from './course.actions';

describe('Courses Actions', () => {

  describe('Delete', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, current: 1, pageSize: 3 };
      const action = new fromActions.Delete(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.DELETE,
        payload
      });
    });
  });

  describe('DeleteFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.DeleteFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.DELETE_FAIL,
        payload
      });
    });
  });

  describe('DeleteSuccess', () => {
    it(`should create an action`, () => {
      const action = new fromActions.DeleteSuccess();

      expect(action.type).toEqual(fromActions.CourseActionTypes.DELETE_SUCCESS);
    });
  });

  describe('GetCourse', () => {
    it(`should create an action`, () => {
      const payload = 1;
      const action = new fromActions.GetCourse(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.COURSE,
        payload
      });
    });
  });

  describe('GetCourseFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.GetCourseFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.COURSE_FAIL,
        payload
      });
    });
  });

  describe('GetCourseSuccess', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };
      const action = new fromActions.GetCourseSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.COURSE_SUCCESS,
        payload
      });
    });
  });

  describe('GetTotal', () => {
    it(`should create an action`, () => {
      const action = new fromActions.GetTotal();

      expect(action.type).toEqual(fromActions.CourseActionTypes.TOTAL);
    });
  });

  describe('GetTotalFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.GetTotalFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.TOTAL_FAIL,
        payload
      });
    });
  });

  describe('GetTotalSuccess', () => {
    it(`should create an action`, () => {
      const payload = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' }
      ];
      const action = new fromActions.GetTotalSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.TOTAL_SUCCESS,
        payload
      });
    });
  });

  describe('Load', () => {
    it(`should create an action`, () => {
      const payload = { current: 1, pageSize: 3 };
      const action = new fromActions.Load(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.LOAD,
        payload
      });
    });
  });

  describe('LoadFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.LoadFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.LOAD_FAIL,
        payload
      });
    });
  });

  describe('LoadSuccess', () => {
    it(`should create an action`, () => {
      const payload = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' }
      ];
      const action = new fromActions.LoadSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.LOAD_SUCCESS,
        payload
      });
    });
  });

  describe('Save', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };
      const action = new fromActions.Save(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.SAVE,
        payload
      });
    });
  });

  describe('SaveFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.SaveFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.SAVE_FAIL,
        payload
      });
    });
  });

  describe('SaveSuccess', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };
      const action = new fromActions.SaveSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.CourseActionTypes.SAVE_SUCCESS,
        payload
      });
    });
  });
});
