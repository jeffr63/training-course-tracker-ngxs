import { TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { DataServiceFacade } from '../../services/data-service-facade';
import { PathsActions } from './paths.actions';
import { PathsState, PathsStateModel } from './paths.state';
import { Path } from '../../models/paths';

const pathsArray: Path[] = [
  { id: 1, name: 'ABC' },
  { id: 2, name: 'DEF' },
  { id: 3, name: 'GHI' },
];

const currentPath = {
  id: 1,
  name: 'ABC',
};

interface AppModel {
  readonly paths: PathsStateModel;
}

describe('Paths', () => {
  let store: Store;
  let service: DataServiceFacade;
  let actions: Actions;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([PathsState]), HttpClientModule],
        providers: [DataServiceFacade],
      }).compileComponents();
      store = TestBed.inject(Store);
      service = TestBed.inject(DataServiceFacade);
      actions = TestBed.inject(Actions);
    })
  );

  it('should initialize values', () => {
    const pathsState: PathsStateModel = {
      paths: pathsArray,
      error: '',
      currentPath: null,
    };
    store.reset(pathsState);

    store
      .selectOnce((state: PathsStateModel) => state.paths)
      .subscribe((paths: Path[]) => {
        expect(paths).toEqual(pathsArray);
      });
  });

  describe('Selector', () => {
    describe('getPaths', () => {
      it(
        'should return an array of Paths',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: pathsArray,
              error: '',
              currentPath: null,
            },
          };
          store.reset(appState);

          expect(PathsState.getPaths(appState.paths)).toEqual(pathsArray);
        })
      );
    });

    describe('getCurrentPath', () => {
      it(
        'should return an object',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: [],
              error: '',
              currentPath: currentPath,
            },
          };
          store.reset(appState);

          expect(PathsState.getCurrentPath(appState.paths)).toEqual(currentPath);
        })
      );
    });

    describe('getError', () => {
      it(
        'should return an string',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: [],
              error: 'Error',
              currentPath: null,
            },
          };
          store.reset(appState);

          expect(PathsState.getError(appState.paths)).toEqual('Error');
        })
      );
    });
  });

  describe('Action', () => {
    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', fakeAsync(() => {
        // arrange
        const action = new PathsActions.DeletePath(3);
        const expected = new PathsActions.DeletePathSuccess(3);
        const callbacksCalled = [];

        spyOn(service, 'deletePath').and.returnValue(of(currentPath));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.DeletePathSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch DeleteFail when errors', fakeAsync(() => {
        const action = new PathsActions.DeletePath(3);
        const expected = new PathsActions.DeletePathFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'deletePath').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.DeletePathFail)).subscribe((x) => {
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
            paths: {
              paths: [],
              error: '',
              currentPath: currentPath,
            },
          };
          store.reset(appState);

          store.dispatch(new PathsActions.DeletePathFail('Error'));

          store
            .selectOnce((state: AppModel) => state.paths)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
              expect(actual.currentPath).toEqual(null);
            });
        })
      );
    });

    describe('DeleteSuccess', () => {
      it(
        'should remove requested item from paths array',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: pathsArray,
              error: '',
              currentPath: currentPath,
            },
          };
          store.reset(appState);

          store.dispatch(new PathsActions.DeletePathSuccess(3));

          store
            .selectOnce((state: AppModel) => state.paths)
            .subscribe((actual) => {
              expect(actual.paths.length).toEqual(2);
              expect(actual.paths[0].id).toBe(1);
              expect(actual.paths[1].id).toBe(2);
              expect(actual.currentPath).toEqual(null);
            });
        })
      );
    });

    describe('Get', () => {
      it('should dispatch GetSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new PathsActions.GetPath(3);
        const expected = new PathsActions.GetPathSuccess(currentPath);
        const callbacksCalled = [];

        spyOn(service, 'getPath').and.returnValue(of(currentPath));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.GetPathSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch GetFail when errors', fakeAsync(() => {
        const action = new PathsActions.GetPath(3);
        const expected = new PathsActions.GetPathFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getPath').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.GetPathFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('GetFail', () => {
      it('should return string in Error', fakeAsync(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath,
          },
        };
        store.reset(appState);

        store.dispatch(new PathsActions.GetPathFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentPath).toEqual(null);
          });
      }));
    });

    describe('GetSuccess', () => {
      it(
        'should set currentPath with requested record and clear error',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: [],
              error: 'Test',
              currentPath: null,
            },
          };
          store.reset(appState);

          store.dispatch(new PathsActions.GetPathSuccess(currentPath));

          store
            .selectOnce((state: AppModel) => state.paths)
            .subscribe((actual) => {
              expect(actual.currentPath).toEqual(currentPath);
              expect(actual.error).toEqual('');
            });
        })
      );
    });

    describe('New Path', () => {
      it(
        'should initialize currentPath values for a new record',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: [],
              error: '',
              currentPath: null,
            },
          };
          store.reset(appState);

          store.dispatch(new PathsActions.NewPath());

          store
            .selectOnce((state: AppModel) => state.paths.currentPath)
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
        const action = new PathsActions.LoadPaths();
        const expected = new PathsActions.LoadPathsSuccess(pathsArray);
        const callbacksCalled = [];

        spyOn(service, 'loadPaths').and.returnValue(of(pathsArray));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.LoadPathsSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch LoadFail when errors', fakeAsync(() => {
        const action = new PathsActions.LoadPaths();
        const expected = new PathsActions.LoadPathsFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'loadPaths').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.LoadPathsFail)).subscribe((x) => {
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
            paths: {
              paths: pathsArray,
              error: '',
              currentPath: null,
            },
          };
          store.reset(appState);

          store.dispatch(new PathsActions.LoadPathsFail('Error'));

          store
            .selectOnce((state: AppModel) => state.paths)
            .subscribe((actual) => {
              expect(actual.paths.length).toEqual(0);
              expect(actual.error).toEqual('Error');
            });
        })
      );
    });

    describe('LoadSuccess', () => {
      it(
        'should set the paths array to returned values and clear error',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: [],
              error: 'Test',
              currentPath: null,
            },
          };
          store.reset(appState);

          store.dispatch(new PathsActions.LoadPathsSuccess(pathsArray));

          store
            .selectOnce((state: AppModel) => state.paths)
            .subscribe((actual) => {
              expect(actual.paths).toEqual(pathsArray);
              expect(actual.error).toEqual('');
            });
        })
      );
    });

    describe('Save', () => {
      it('should dispatch SaveSuccuss when successful', fakeAsync(() => {
        // arrange
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath,
          },
        };
        store.reset(appState);
        const action = new PathsActions.SavePath();
        const expected = new PathsActions.SavePathSuccess(currentPath);
        const callbacksCalled = [];

        spyOn(service, 'savePath').and.returnValue(of(currentPath));
        spyOn(service, 'loadPaths').and.returnValue(of(pathsArray));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.SavePathSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch SaveFail when errors', fakeAsync(() => {
        const action = new PathsActions.SavePath();
        const expected = new PathsActions.SavePathFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'savePath').and.returnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(PathsActions.SavePathFail)).subscribe((x) => {
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
            paths: {
              paths: [],
              error: '',
              currentPath: null,
            },
          };
          store.reset(appState);

          store.dispatch(new PathsActions.SavePathFail('Error'));

          store
            .selectOnce((state: AppModel) => state.paths)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
            });
        })
      );
    });

    describe('SaveSuccess', () => {
      it(
        'should update the path array with new value',
        waitForAsync(() => {
          const appState: AppModel = {
            paths: {
              paths: pathsArray,
              error: 'Test',
              currentPath: currentPath,
            },
          };
          store.reset(appState);

          const expected: Path = {
            id: 3,
            name: 'XYZ',
          };
          store.dispatch(new PathsActions.SavePathSuccess(expected));

          store
            .selectOnce((state: AppModel) => state.paths)
            .subscribe((actual) => {
              expect(actual.paths.length).toEqual(pathsArray.length);
              expect(actual.paths[2]).toEqual(expected);
              expect(actual.error).toEqual('');
              expect(actual.currentPath).toEqual(null);
            });
        })
      );
    });
  });
});
