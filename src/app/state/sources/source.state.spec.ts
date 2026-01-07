import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { expect, it, describe, beforeEach, afterEach, vitest, vi } from 'vitest';
import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { SourceData } from '@services/source/source-data';
import { SourcesActions } from './source.actions';
import { SourceState, SourceStateModel } from './source.state';
import { Source } from '@models/sources-interface';

const sourceArray: Source[] = [
  { id: 1, name: 'ABC' },
  { id: 2, name: 'DEF' },
  { id: 3, name: 'GHI' },
];

const currentSource = {
  id: 1,
  name: 'ABC',
};

interface AppModel {
  readonly sources: SourceStateModel;
}

describe('sources', () => {
  let store: Store;
  let service: SourceData;
  let actions: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SourceState])],
      providers: [SourceData, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
    store = TestBed.inject(Store);
    service = TestBed.inject(SourceData);
    actions = TestBed.inject(Actions);
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });

  it('should initialize values', async () => {
    const appState: SourceStateModel = {
      sources: sourceArray,
      error: '',
      currentSource: null,
    };
    Promise.resolve().then(() => store.reset(appState));
    await vitest.runAllTimersAsync();

    store
      .selectOnce((state: SourceStateModel) => state.sources)
      .subscribe((sources: Source[]) => {
        expect(sources).toEqual(sourceArray);
      });
  });

  describe('Selector', () => {
    describe('getSources', () => {
      it('should return an array of Sources', async () => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: '',
            currentSource: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(SourceState.getSources(appState.sources)).toEqual(sourceArray);
      });
    });

    describe('getcurrentSource', () => {
      it('should return an object', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(SourceState.getCurrentSource(appState.sources)).toEqual(currentSource);
      });
    });

    describe('getError', () => {
      it('should return an string', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: 'Error',
            currentSource: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(SourceState.getError(appState.sources)).toEqual('Error');
      });
    });
  });

  describe('Action', () => {
    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', async () => {
        // arrange
        const action = new SourcesActions.DeleteSource(3);
        const expected = new SourcesActions.DeleteSourceSuccess(3);
        const callbacksCalled = [];

        vi.spyOn(service, 'deleteSource').mockReturnValue(of(currentSource));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.DeleteSourceSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch DeleteFail when errors', async () => {
        const action = new SourcesActions.DeleteSource(3);
        const expected = new SourcesActions.DeleteSourceFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'deleteSource').mockReturnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.DeleteSourceFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });
    });

    describe('DeleteFail', () => {
      it('should return string in Error', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.DeleteSourceFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentSource).toEqual(null);
          });
      });
    });

    describe('DeleteSuccess', () => {
      it('should remove requested item from sources array', async () => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: '',
            currentSource: currentSource,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.DeleteSourceSuccess(3));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.sources.length).toEqual(2);
            expect(actual.sources[0].id).toBe(1);
            expect(actual.sources[1].id).toBe(2);
            expect(actual.currentSource).toEqual(null);
          });
      });
    });

    describe('Get', () => {
      it('should dispatch GetSuccusss when successful', async () => {
        // arrange
        const action = new SourcesActions.GetSource(3);
        const expected = new SourcesActions.GetSourceSuccess(currentSource);
        const callbacksCalled = [];

        vi.spyOn(service, 'getSource').mockReturnValue(of(currentSource));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.GetSourceSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch GetFail when errors', async () => {
        const action = new SourcesActions.GetSource(3);
        const expected = new SourcesActions.GetSourceFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'getSource').mockReturnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.GetSourceFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });
    });

    describe('GetFail', () => {
      it('should return string in Error', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.GetSourceFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentSource).toEqual(null);
          });
      });
    });

    describe('GetSuccess', () => {
      it('should set currentSource with requested record and clear error', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: 'Test',
            currentSource: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.GetSourceSuccess(currentSource));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.currentSource).toEqual(currentSource);
            expect(actual.error).toEqual('');
          });
      });
    });

    describe('New Source', () => {
      it('should initialize currentSource values for a new record', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.NewSource());

        store
          .selectOnce((state: AppModel) => state.sources.currentSource)
          .subscribe((current) => {
            expect(current.id).toEqual(null);
            expect(current.name).toEqual('');
          });
      });
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', async () => {
        // arrange
        const action = new SourcesActions.LoadSources();
        const expected = new SourcesActions.LoadSourcesSuccess(sourceArray);
        const callbacksCalled = [];

        vi.spyOn(service, 'loadSources').mockReturnValue(of(sourceArray));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.LoadSourcesSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch LoadFail when errors', async () => {
        const action = new SourcesActions.LoadSources();
        const expected = new SourcesActions.LoadSourcesFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'loadSources').mockReturnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.LoadSourcesFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });
    });

    describe('LoadFail', () => {
      it('should return string in Error', async () => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: '',
            currentSource: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.LoadSourcesFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.sources.length).toEqual(0);
            expect(actual.error).toEqual('Error');
          });
      });
    });

    describe('LoadSuccess', () => {
      it('should set the sources array to returned values and clear error', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: 'Test',
            currentSource: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.LoadSourcesSuccess(sourceArray));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.sources).toEqual(sourceArray);
            expect(actual.error).toEqual('');
          });
      });
    });

    describe('Save', () => {
      it('should dispatch SaveSuccuss when successful', async () => {
        // arrange
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource,
          },
        };
        store.reset(appState);
        const action = new SourcesActions.SaveSource(currentSource);
        const expected = new SourcesActions.SaveSourceSuccess(currentSource);
        const callbacksCalled = [];

        vi.spyOn(service, 'saveSource').mockReturnValue(of(currentSource));
        vi.spyOn(service, 'loadSources').mockReturnValue(of(sourceArray));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.SaveSourceSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch SaveFail when errors', async () => {
        // arrange
        const action = new SourcesActions.SaveSource(currentSource);
        const expected = new SourcesActions.SaveSourceFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'saveSource').mockReturnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.SaveSourceFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });
    });

    describe('SaveFail', () => {
      it('should return string in Error', async () => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new SourcesActions.SaveSourceFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
          });
      });
    });

    describe('SaveSuccess', () => {
      it('should update the source array with new value', async () => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: 'Test',
            currentSource: currentSource,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        const expected: Source = {
          id: 3,
          name: 'XYZ',
        };
        store.dispatch(new SourcesActions.SaveSourceSuccess(expected));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe((actual) => {
            expect(actual.sources.length).toEqual(sourceArray.length);
            expect(actual.sources[2]).toEqual(expected);
            expect(actual.error).toEqual('');
            expect(actual.currentSource).toEqual(null);
          });
      });
    });
  });
});
