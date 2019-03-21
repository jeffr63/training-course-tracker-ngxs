import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { empty } from 'rxjs';

import { Path } from '../../services/paths';
import { PathsEffects } from './paths.effects';
import { PathsService } from '../../services/paths.service';
import {
  Delete, DeleteFail, DeleteSuccess,
  Get, GetFail, GetSuccess,
  Load, LoadFail, LoadSuccess,
  Save, SaveFail, SaveSuccess
} from '../actions/paths.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockCoursesService {
  delete = jasmine.createSpy('delete');
  get = jasmine.createSpy('get');
  load = jasmine.createSpy('load');
  save = jasmine.createSpy('save');
}

describe(`Paths Effects`, () => {
  let actions$: TestActions;
  let effects: PathsEffects;
  let pathsService: MockCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathsEffects,
        provideMockActions(() => actions$),
        { provide: PathsService, useClass: MockCoursesService },
        { provide: Actions, useFactory: getActions },
      ]
    });

    effects = TestBed.get(PathsEffects);
    pathsService = TestBed.get(PathsService);
    actions$ = TestBed.get(Actions);
  });

  describe(`deletePath$ effect`, () => {
    it(`should return DeleteSuccess, with course, on success`, () => {
      const action = new Delete(1);
      const completion = new DeleteSuccess(1);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: 1 });
      const expected = cold('--c', { c: completion });
      pathsService.delete.and.returnValue(response);

      expect(effects.deletePath$).toBeObservable(expected);
    });

    it(`should return DeleteFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Delete(1);
      const completion = new DeleteFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.delete.and.returnValue(response);

      expect(effects.deletePath$).toBeObservable(expected);
    });
  });

  describe(`getPath$ effect`, () => {
    it(`should return GetSuccess, with path, on success`, () => {
      const path: Path = { id: 1, name: 'ABC' };

      const action = new Get(1);
      const completion = new GetSuccess(path);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: path });
      const expected = cold('--c', { c: completion });
      pathsService.get.and.returnValue(response);

      expect(effects.getPath$).toBeObservable(expected);
    });

    it(`should return GetFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Get(1);
      const completion = new GetFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.get.and.returnValue(response);

      expect(effects.getPath$).toBeObservable(expected);
    });
  });

  describe(`loadPaths$ effect`, () => {
    it(`should return LoadSuccess, with paths, on success`, () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];

      const action = new Load();
      const completion = new LoadSuccess(paths);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: paths });
      const expected = cold('--c', { c: completion });
      pathsService.load.and.returnValue(response);

      expect(effects.loadPaths$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Load();
      const completion = new LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.load.and.returnValue(response);

      expect(effects.loadPaths$).toBeObservable(expected);
    });
  });

  describe(`savePath$ effect`, () => {
    it(`should return SaveSuccess, with path, on success`, () => {
      const path: Path = { id: 1, name: 'ABC' };

      const action = new Save(path);
      const load = new Load();
      const completion = new SaveSuccess(path);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: path });
      const expected = cold('--(cd)', { c: load, d: completion });
      pathsService.save.and.returnValue(response);

      expect(effects.savePath$).toBeObservable(expected);
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const path: Path = { id: 1, name: 'ABC' };
      const error = 'Error';
      const action = new Save(path);
      const completion = new SaveFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      pathsService.save.and.returnValue(response);

      expect(effects.savePath$).toBeObservable(expected);
    });
  });
});
