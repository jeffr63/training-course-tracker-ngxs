import * as fromActions from './sources.actions';

describe('Sources Actions', () => {
  describe('Delete', () => {
    it(`should create an action`, () => {
      const payload = 1;
       const action = new fromActions.Delete(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.DELETE,
        payload
      });
    });
  });

  describe('DeleteFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.DeleteFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.DELETE_FAIL,
        payload
      });
    });
  });

  describe('DeleteSuccess', () => {
    it(`should create an action`, () => {
      const payload = 1;
      const action = new fromActions.DeleteSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.DELETE_SUCCESS,
        payload
      });
    });
  });

  describe('Get', () => {
    it(`should create an action`, () => {
      const payload = 1;
      const action = new fromActions.Get(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.GET,
        payload
      });
    });
  });

  describe('GetFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.GetFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.GET_FAIL,
        payload
      });
    });
  });

  describe('GetSuccess', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, name: 'ABC' };
      const action = new fromActions.GetSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.GET_SUCCESS,
        payload
      });
    });
  });

  describe('NewSourse', () => {
    it(`should create an action`, () => {
      const action = new fromActions.NewSource();

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.NEW_SOURCE,
      });
    });
  });

  describe('Load', () => {
    it(`should create an action`, () => {
      const action = new fromActions.Load();

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.LOAD,
      });
    });
  });

  describe('LoadFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.LoadFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.LOAD_FAIL,
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
        type: fromActions.SourcesActionTypes.LOAD_SUCCESS,
        payload
      });
    });
  });

  describe('Save', () => {
    it(`should create an action`, () => {
      const action = new fromActions.Save();

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.SAVE
      });
    });
  });

  describe('SaveFail', () => {
    it(`should create an action`, () => {
      const payload = 'Error';
      const action = new fromActions.SaveFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.SAVE_FAIL,
        payload
      });
    });
  });

  describe('SaveSuccess', () => {
    it(`should create an action`, () => {
      const payload = { id: 1, name: 'ABC' };
      const action = new fromActions.SaveSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SourcesActionTypes.SAVE_SUCCESS,
        payload
      });
    });
  });
});
