import * as fromActions from './paths.actions';

describe('Paths Actions', () => {

  describe('Delete', () => {
    it(`should create an action`, () => {
      const payload = 1;
       const action = new fromActions.Delete(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.DELETE,
        payload
      });
    });
  });

  describe('DeleteFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.DeleteFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.DELETE_FAIL,
        payload
      });
    });
  });

  describe('DeleteSuccess', () => {
    it(`should create an action`, () => {
      const payload = 1;
      const action = new fromActions.DeleteSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.DELETE_SUCCESS,
        payload
      });
    });
  });

  describe('Get', () => {
    it(`should create an action`, () => {
      const payload = 1;
      const action = new fromActions.Get(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.GET,
        payload
      });
    });
  });

  describe('GetFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.GetFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.GET_FAIL,
        payload
      });
    });
  });

  describe('GetSuccess', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, name: 'ABC' };
      const action = new fromActions.GetSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.GET_SUCCESS,
        payload
      });
    });
  });

  describe('Load', () => {
    it(`should create an action`, () => {
      const action = new fromActions.Load();

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.LOAD
      });
    });
  });

  describe('LoadFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.LoadFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.LOAD_FAIL,
        payload
      });
    });
  });

  describe('LoadSuccess', () => {
    it(`should create an action`, () => {
      const payload = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const action = new fromActions.LoadSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.LOAD_SUCCESS,
        payload
      });
    });
  });

  describe('NewPath', () => {
    it(`should create an action`, () => {
      const action = new fromActions.NewPath();

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.NEW_PATH,
      });
    });
  });

  describe('Save', () => {
    it(`should create an action`, () => {
      const action = new fromActions.Save();

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.SAVE,
      });
    });
  });

  describe('SaveFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.SaveFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.SAVE_FAIL,
        payload
      });
    });
  });

  describe('SaveSuccess', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, name: 'ABC' };
      const action = new fromActions.SaveSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.PathsActionTypes.SAVE_SUCCESS,
        payload
      });
    });
  });
});
