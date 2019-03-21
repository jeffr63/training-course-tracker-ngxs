import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { empty } from 'rxjs';

import { Source } from '../../services/sources';
import { SourcesEffects } from './sources.effects';
import { SourcesService } from '../../services/sources.service';
import {
  Delete, DeleteFail, DeleteSuccess,
  Get, GetFail, GetSuccess,
  Load, LoadFail, LoadSuccess,
  Save, SaveFail, SaveSuccess
} from '../actions/sources.actions';

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

describe(`Sources Effects`, () => {
  let actions$: TestActions;
  let effects: SourcesEffects;
  let sourcesService: MockCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourcesEffects,
        provideMockActions(() => actions$),
        { provide: SourcesService, useClass: MockCoursesService },
        { provide: Actions, useFactory: getActions },
      ]
    });

    effects = TestBed.get(SourcesEffects);
    sourcesService = TestBed.get(SourcesService);
    actions$ = TestBed.get(Actions);
  });

  describe(`deleteSource$ effect`, () => {
    it(`should return DeleteSuccess, with course, on success`, () => {
      const action = new Delete(1);
      const completion = new DeleteSuccess(1);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: 1 });
      const expected = cold('--c', { c: completion });
      sourcesService.delete.and.returnValue(response);

      expect(effects.deleteSource$).toBeObservable(expected);
    });

    it(`should return DeleteFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Delete(1);
      const completion = new DeleteFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.delete.and.returnValue(response);

      expect(effects.deleteSource$).toBeObservable(expected);
    });
  });

  describe(`getSource$ effect`, () => {
    it(`should return GetSuccess, with path, on success`, () => {
      const source: Source = { id: 1, name: 'ABC' };

      const action = new Get(1);
      const completion = new GetSuccess(source);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: source });
      const expected = cold('--c', { c: completion });
      sourcesService.get.and.returnValue(response);

      expect(effects.getSource$).toBeObservable(expected);
    });

    it(`should return GetFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Get(1);
      const completion = new GetFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.get.and.returnValue(response);

      expect(effects.getSource$).toBeObservable(expected);
    });
  });

  describe(`loadSource$ effect`, () => {
    it(`should return LoadSuccess, with paths, on success`, () => {
      const sources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];

      const action = new Load();
      const completion = new LoadSuccess(sources);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: sources });
      const expected = cold('--c', { c: completion });
      sourcesService.load.and.returnValue(response);

      expect(effects.loadSources$).toBeObservable(expected);
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = new Load();
      const completion = new LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.load.and.returnValue(response);

      expect(effects.loadSources$).toBeObservable(expected);
    });
  });

  describe(`saveSource$ effect`, () => {
    it(`should return SaveSuccess, with source, on success`, () => {
      const source: Source = { id: 1, name: 'ABC' };

      const action = new Save(source);
      const load = new Load();
      const completion = new SaveSuccess(source);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: source });
      const expected = cold('--(cd)', { c: load, d: completion });
      sourcesService.save.and.returnValue(response);

      expect(effects.saveSource$).toBeObservable(expected);
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const source: Source = { id: 1, name: 'ABC' };
      const error = 'Error';
      const action = new Save(source);
      const completion = new SaveFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      sourcesService.save.and.returnValue(response);

      expect(effects.saveSource$).toBeObservable(expected);
    });
  });
});
