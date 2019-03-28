import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';

import { SourcesState, SourcesStateModel } from './sources.state';
import { SourcesService } from '../services/sources.service';
import { Source } from '../services/sources';
import {
  Delete, DeleteFail, DeleteSuccess, Get, GetFail, GetSuccess,
  Load, LoadFail, LoadSuccess, NewSource, Save, SaveFail, SaveSuccess
} from './sources.actions';
import { of, throwError } from 'rxjs';

const sourceArray: Source[] = [
  { id: 1, name: 'ABC' },
  { id: 2, name: 'DEF' },
  { id: 3, name: 'GHI' }
];

const currentSource = {
  id: 1, name: 'ABC'
};

interface AppModel {
  readonly sources: SourcesStateModel;
}

describe('sources', () => {
  let store: Store;
  let service: SourcesService;
  let actions: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([SourcesState]),
        HttpClientModule
      ],
      providers: []
    }).compileComponents();
    store = TestBed.get(Store);
    service = TestBed.get(SourcesService);
    actions = TestBed.get(Actions);
  }));

  it('should initialize values', () => {
    const sourcesState: SourcesStateModel = {
      sources: sourceArray,
      error: '',
      currentSource: null
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

      it('should return an array of Sources', async(() => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: '',
            currentSource: null
          }
        };
        store.reset(appState);

        expect(SourcesState.getSources(appState.sources)).toEqual(sourceArray);
      }));
    });

    describe('getcurrentSource', () => {
      it('should return an object', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource
          }
        };
        store.reset(appState);

        expect(SourcesState.getCurrentSource(appState.sources)).toEqual(currentSource);
      }));
    });

    describe('getError', () => {
      it('should return an string', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: 'Error',
            currentSource: null
          }
        };
        store.reset(appState);

        expect(SourcesState.getError(appState.sources)).toEqual('Error');
      }));
    });

  });

  describe('Action', () => {

    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', fakeAsync(() => {
        // arrange
        const action = new Delete(3);
        const expected = new DeleteSuccess(3);
        const callbacksCalled = [];

        spyOn(service, 'delete').and.returnValue(of(currentSource));

        // action
        actions
          .pipe(ofActionSuccessful(DeleteSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch DeleteFail when errors', fakeAsync(() => {
        const action = new Delete(3);
        const expected = new DeleteFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'delete').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(DeleteFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('DeleteFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource
          }
        };
        store.reset(appState);

        store.dispatch(new DeleteFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentSource).toEqual(null);
          });
      }));
    });

    describe('DeleteSuccess', () => {
      it('should remove requested item from sources array', async(() => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: '',
            currentSource: currentSource
          }
        };
        store.reset(appState);

        store.dispatch(new DeleteSuccess(3));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.sources.length).toEqual(2);
            expect(actual.sources[0].id).toBe(1);
            expect(actual.sources[1].id).toBe(2);
            expect(actual.currentSource).toEqual(null);
          });
      }));
    });

    describe('Get', () => {
      it('should dispatch GetSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new Get(3);
        const expected = new GetSuccess(currentSource);
        const callbacksCalled = [];

        spyOn(service, 'get').and.returnValue(of(currentSource));

        // action
        actions
          .pipe(ofActionSuccessful(GetSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch GetFail when errors', fakeAsync(() => {
        const action = new Get(3);
        const expected = new GetFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'get').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(GetFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('GetFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource
          }
        };
        store.reset(appState);

        store.dispatch(new GetFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentSource).toEqual(null);
          });
      }));
    });

    describe('GetSuccess', () => {
      it('should set currentSource with requested record and clear error', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: 'Test',
            currentSource: null
          }
        };
        store.reset(appState);

        store.dispatch(new GetSuccess(currentSource));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.currentSource).toEqual(currentSource);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('New Source', () => {
      it('should initialize currentSource values for a new record', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: null
          }
        };
        store.reset(appState);

        store.dispatch(new NewSource());

        store
          .selectOnce((state: AppModel) => state.sources.currentSource)
          .subscribe(current => {
            expect(current.id).toEqual(null);
            expect(current.name).toEqual('');
          });
      }));
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new Load();
        const expected = new LoadSuccess(sourceArray);
        const callbacksCalled = [];

        spyOn(service, 'load').and.returnValue(of(sourceArray));

        // action
        actions
          .pipe(ofActionSuccessful(LoadSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch LoadFail when errors', fakeAsync(() => {
        const action = new Load();
        const expected = new LoadFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'load').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(LoadFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('LoadFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: '',
            currentSource: null
          }
        };
        store.reset(appState);

        store.dispatch(new LoadFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.sources.length).toEqual(0);
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('LoadSuccess', () => {
      it('should set the sources array to returned values and clear error', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: 'Test',
            currentSource: null
          }
        };
        store.reset(appState);

        store.dispatch(new LoadSuccess(sourceArray));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.sources).toEqual(sourceArray);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('Save', () => {
      it('should dispatch SaveSuccuss when successful', fakeAsync(() => {
        // arrange
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: currentSource
          }
        };
        store.reset(appState);
        const action = new Save();
        const expected = new SaveSuccess(currentSource);
        const callbacksCalled = [];

        spyOn(service, 'save').and.returnValue(of(currentSource));
        spyOn(service, 'load').and.returnValue(of(sourceArray));

        // action
        actions
          .pipe(ofActionSuccessful(SaveSuccess))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch SaveFail when errors', fakeAsync(() => {
        // arrange
        const action = new Save();
        const expected = new SaveFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'save').and.returnValue(throwError('Error'));

        // action
        actions
          .pipe(ofActionSuccessful(SaveFail))
          .subscribe(x => {
            callbacksCalled.push(x);
          });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('SaveFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          sources: {
            sources: [],
            error: '',
            currentSource: null
          }
        };
        store.reset(appState);

        store.dispatch(new SaveFail('Error'));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('SaveSuccess', () => {
      it('should update the source array with new value', async(() => {
        const appState: AppModel = {
          sources: {
            sources: sourceArray,
            error: 'Test',
            currentSource: currentSource
          }
        };
        store.reset(appState);

        const expected: Source = {
          id: 3,
          name: 'XYZ'
        };
        store.dispatch(new SaveSuccess(expected));

        store
          .selectOnce((state: AppModel) => state.sources)
          .subscribe(actual => {
            expect(actual.sources.length).toEqual(sourceArray.length);
            expect(actual.sources[2]).toEqual(expected);
            expect(actual.error).toEqual('');
            expect(actual.currentSource).toEqual(null);
          });
      }));
    });

  });

});
