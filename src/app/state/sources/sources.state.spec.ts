import { TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { DataServiceFacade } from '../../services/data-service-facade';
import { SourcesActions } from './sources.actions';
import { SourcesState, SourcesStateModel } from './sources.state';
import { Source } from '../../shared/sources';

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
  readonly sources: SourcesStateModel;
}

describe('sources', () => {
  let store: Store;
  let service: DataServiceFacade;
  let actions: Actions;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([SourcesState]), HttpClientModule],
        providers: [DataServiceFacade],
      }).compileComponents();
      store = TestBed.inject(Store);
      service = TestBed.inject(DataServiceFacade);
      actions = TestBed.inject(Actions);
    })
  );

  it('should initialize values', () => {
    const sourcesState: SourcesStateModel = {
      sources: sourceArray,
      error: '',
      currentSource: null,
    };
    store.reset(sourcesState);

    store
      .selectOnce((state: SourcesStateModel) => state.sources)
      .subscribe((sources: Source[]) => {
        expect(sources).toEqual(sourceArray);
      });
  });

  describe('Selector', () => {
    describe('getSources', () => {
      it(
        'should return an array of Sources',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: sourceArray,
              error: '',
              currentSource: null,
            },
          };
          store.reset(appState);

          expect(SourcesState.getSources(appState.sources)).toEqual(sourceArray);
        })
      );
    });

    describe('getcurrentSource', () => {
      it(
        'should return an object',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: '',
              currentSource: currentSource,
            },
          };
          store.reset(appState);

          expect(SourcesState.getCurrentSource(appState.sources)).toEqual(currentSource);
        })
      );
    });

    describe('getError', () => {
      it(
        'should return an string',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: 'Error',
              currentSource: null,
            },
          };
          store.reset(appState);

          expect(SourcesState.getError(appState.sources)).toEqual('Error');
        })
      );
    });
  });

  describe('Action', () => {
    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', fakeAsync(() => {
        // arrange
        const action = new SourcesActions.DeleteSource(3);
        const expected = new SourcesActions.DeleteSourceSuccess(3);
        const callbacksCalled = [];

        spyOn(service, 'deleteSource').and.returnValue(of(currentSource));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.DeleteSourceSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch DeleteFail when errors', fakeAsync(() => {
        const action = new SourcesActions.DeleteSource(3);
        const expected = new SourcesActions.DeleteSourceFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'deleteSource').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.DeleteSourceFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('DeleteFail', () => {
      it(
        'should return string in Error',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: '',
              currentSource: currentSource,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.DeleteSourceFail('Error'));

          store
            .selectOnce((state: AppModel) => state.sources)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
              expect(actual.currentSource).toEqual(null);
            });
        })
      );
    });

    describe('DeleteSuccess', () => {
      it(
        'should remove requested item from sources array',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: sourceArray,
              error: '',
              currentSource: currentSource,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.DeleteSourceSuccess(3));

          store
            .selectOnce((state: AppModel) => state.sources)
            .subscribe((actual) => {
              expect(actual.sources.length).toEqual(2);
              expect(actual.sources[0].id).toBe(1);
              expect(actual.sources[1].id).toBe(2);
              expect(actual.currentSource).toEqual(null);
            });
        })
      );
    });

    describe('Get', () => {
      it('should dispatch GetSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new SourcesActions.GetSource(3);
        const expected = new SourcesActions.GetSourceSuccess(currentSource);
        const callbacksCalled = [];

        spyOn(service, 'getSource').and.returnValue(of(currentSource));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.GetSourceSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch GetFail when errors', fakeAsync(() => {
        const action = new SourcesActions.GetSource(3);
        const expected = new SourcesActions.GetSourceFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getSource').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.GetSourceFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('GetFail', () => {
      it(
        'should return string in Error',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: '',
              currentSource: currentSource,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.GetSourceFail('Error'));

          store
            .selectOnce((state: AppModel) => state.sources)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
              expect(actual.currentSource).toEqual(null);
            });
        })
      );
    });

    describe('GetSuccess', () => {
      it(
        'should set currentSource with requested record and clear error',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: 'Test',
              currentSource: null,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.GetSourceSuccess(currentSource));

          store
            .selectOnce((state: AppModel) => state.sources)
            .subscribe((actual) => {
              expect(actual.currentSource).toEqual(currentSource);
              expect(actual.error).toEqual('');
            });
        })
      );
    });

    describe('New Source', () => {
      it(
        'should initialize currentSource values for a new record',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: '',
              currentSource: null,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.NewSource());

          store
            .selectOnce((state: AppModel) => state.sources.currentSource)
            .subscribe((current) => {
              expect(current.id).toEqual(null);
              expect(current.name).toEqual('');
            });
        })
      );
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new SourcesActions.LoadSources();
        const expected = new SourcesActions.LoadSourcesSuccess(sourceArray);
        const callbacksCalled = [];

        spyOn(service, 'loadSources').and.returnValue(of(sourceArray));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.LoadSourcesSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch LoadFail when errors', fakeAsync(() => {
        const action = new SourcesActions.LoadSources();
        const expected = new SourcesActions.LoadSourcesFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'loadSources').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.LoadSourcesFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('LoadFail', () => {
      it(
        'should return string in Error',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: sourceArray,
              error: '',
              currentSource: null,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.LoadSourcesFail('Error'));

          store
            .selectOnce((state: AppModel) => state.sources)
            .subscribe((actual) => {
              expect(actual.sources.length).toEqual(0);
              expect(actual.error).toEqual('Error');
            });
        })
      );
    });

    describe('LoadSuccess', () => {
      it(
        'should set the sources array to returned values and clear error',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: 'Test',
              currentSource: null,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.LoadSourcesSuccess(sourceArray));

          store
            .selectOnce((state: AppModel) => state.sources)
            .subscribe((actual) => {
              expect(actual.sources).toEqual(sourceArray);
              expect(actual.error).toEqual('');
            });
        })
      );
    });

    describe('Save', () => {
      it('should dispatch SaveSuccuss when successful', fakeAsync(() => {
        // arrange
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource,
          },
        };
        store.reset(appState);
        const action = new SourcesActions.SaveSource();
        const expected = new SourcesActions.SaveSourceSuccess(currentSource);
        const callbacksCalled = [];

        spyOn(service, 'saveSource').and.returnValue(of(currentSource));
        spyOn(service, 'loadSources').and.returnValue(of(sourceArray));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.SaveSourceSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch SaveFail when errors', fakeAsync(() => {
        // arrange
        const action = new SourcesActions.SaveSource();
        const expected = new SourcesActions.SaveSourceFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'saveSource').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(SourcesActions.SaveSourceFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('SaveFail', () => {
      it(
        'should return string in Error',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: [],
              error: '',
              currentSource: null,
            },
          };
          store.reset(appState);

          store.dispatch(new SourcesActions.SaveSourceFail('Error'));

          store
            .selectOnce((state: AppModel) => state.sources)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
            });
        })
      );
    });

    describe('SaveSuccess', () => {
      it(
        'should update the source array with new value',
        waitForAsync(() => {
          const appState: AppModel = {
            sources: {
              sources: sourceArray,
              error: 'Test',
              currentSource: currentSource,
            },
          };
          store.reset(appState);

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
        })
      );
    });
  });
});
