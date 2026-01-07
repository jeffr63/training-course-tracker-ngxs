import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { expect, it, describe, beforeEach, afterEach, vi, vitest } from 'vitest';
import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { PathData } from '@services/path/path-data';
import { PathActions } from './path.actions';
import { PathState, PathStateModel } from './path.state';
import { Path } from '@models/paths-interface';

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
  readonly paths: PathStateModel;
}

describe('Paths', () => {
  let store: Store;
  let service: PathData;
  let actions: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PathState])],
      providers: [PathData, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
    store = TestBed.inject(Store);
    service = TestBed.inject(PathData);
    actions = TestBed.inject(Actions);
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });

  it('should initialize values', async () => {
    const appState: PathStateModel = {
      paths: pathsArray,
      error: '',
      currentPath: null,
    };
    Promise.resolve().then(() => store.reset(appState));
    await vitest.runAllTimersAsync();

    store
      .selectOnce((state: PathStateModel) => state.paths)
      .subscribe((paths: Path[]) => {
        expect(paths).toEqual(pathsArray);
      });
  });

  describe('Selector', () => {
    describe('getPaths', () => {
      it('should return an array of Paths', async () => {
        const appState: AppModel = {
          paths: {
            paths: pathsArray,
            error: '',
            currentPath: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(PathState.getPaths(appState.paths)).toEqual(pathsArray);
      });
    });

    describe('getCurrentPath', () => {
      it('should return an object', async () => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(PathState.getCurrentPath(appState.paths)).toEqual(currentPath);
      });
    });

    describe('getError', () => {
      it('should return an string', async () => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: 'Error',
            currentPath: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(PathState.getError(appState.paths)).toEqual('Error');
      });
    });
  });

  describe('Action', () => {
    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', async () => {
        // arrange
        const action = new PathActions.DeletePath(3);
        const expected = new PathActions.DeletePathSuccess(3);
        const callbacksCalled = [];

        vi.spyOn(service, 'deletePath').mockReturnValue(of(currentPath));

        // action
        actions.pipe(ofActionSuccessful(PathActions.DeletePathSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch DeleteFail when errors', async () => {
        const action = new PathActions.DeletePath(3);
        const expected = new PathActions.DeletePathFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'deletePath').mockReturnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(PathActions.DeletePathFail)).subscribe((x) => {
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
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.DeletePathFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentPath).toEqual(null);
          });
      });
    });

    describe('DeleteSuccess', () => {
      it('should remove requested item from paths array', async () => {
        const appState: AppModel = {
          paths: {
            paths: pathsArray,
            error: '',
            currentPath: currentPath,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.DeletePathSuccess(3));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.paths.length).toEqual(2);
            expect(actual.paths[0].id).toBe(1);
            expect(actual.paths[1].id).toBe(2);
            expect(actual.currentPath).toEqual(null);
          });
      });
    });

    describe('Get', () => {
      it('should dispatch GetSuccusss when successful', async () => {
        // arrange
        const action = new PathActions.GetPath(3);
        const expected = new PathActions.GetPathSuccess(currentPath);
        const callbacksCalled = [];

        vi.spyOn(service, 'getPath').mockReturnValue(of(currentPath));

        // action
        actions.pipe(ofActionSuccessful(PathActions.GetPathSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch GetFail when errors', async () => {
        const action = new PathActions.GetPath(3);
        const expected = new PathActions.GetPathFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'getPath').mockReturnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(PathActions.GetPathFail)).subscribe((x) => {
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
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.GetPathFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentPath).toEqual(null);
          });
      });
    });

    describe('GetSuccess', () => {
      it('should set currentPath with requested record and clear error', async () => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: 'Test',
            currentPath: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.GetPathSuccess(currentPath));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.currentPath).toEqual(currentPath);
            expect(actual.error).toEqual('');
          });
      });
    });

    describe('New Path', () => {
      it('should initialize currentPath values for a new record', async () => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.NewPath());

        store
          .selectOnce((state: AppModel) => state.paths.currentPath)
          .subscribe((current) => {
            expect(current.id).toEqual(null);
            expect(current.name).toEqual('');
          });
      });
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', async () => {
        // arrange
        const action = new PathActions.LoadPaths();
        const expected = new PathActions.LoadPathsSuccess(pathsArray);
        const callbacksCalled = [];

        vi.spyOn(service, 'loadPaths').mockReturnValue(of(pathsArray));

        // action
        actions.pipe(ofActionSuccessful(PathActions.LoadPathsSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch LoadFail when errors', async () => {
        const action = new PathActions.LoadPaths();
        const expected = new PathActions.LoadPathsFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'loadPaths').mockReturnValue(throwError('Error'));

        // action
        actions.pipe(ofActionSuccessful(PathActions.LoadPathsFail)).subscribe((x) => {
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
          paths: {
            paths: pathsArray,
            error: '',
            currentPath: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.LoadPathsFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.paths.length).toEqual(0);
            expect(actual.error).toEqual('Error');
          });
      });
    });

    describe('LoadSuccess', () => {
      it('should set the paths array to returned values and clear error', async () => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: 'Test',
            currentPath: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.LoadPathsSuccess(pathsArray));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.paths).toEqual(pathsArray);
            expect(actual.error).toEqual('');
          });
      });
    });

    describe('Save', () => {
      it('should dispatch SaveSuccuss when successful', async () => {
        // arrange
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();
        const action = new PathActions.SavePath(currentPath);
        const expected = new PathActions.SavePathSuccess(currentPath);
        const callbacksCalled = [];

        vi.spyOn(service, 'savePath').mockReturnValue(of(currentPath));
        vi.spyOn(service, 'loadPaths').mockReturnValue(of(pathsArray));

        // action
        actions.pipe(ofActionSuccessful(PathActions.SavePathSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch SaveFail when errors', async () => {
        const action = new PathActions.SavePath(currentPath);
        const expected = new PathActions.SavePathFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'savePath').mockReturnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(PathActions.SavePathFail)).subscribe((x) => {
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
          paths: {
            paths: [],
            error: '',
            currentPath: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new PathActions.SavePathFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
          });
      });
    });

    describe('SaveSuccess', () => {
      it('should update the path array with new value', async () => {
        const appState: AppModel = {
          paths: {
            paths: pathsArray,
            error: 'Test',
            currentPath: currentPath,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        const expected: Path = {
          id: 3,
          name: 'XYZ',
        };
        store.dispatch(new PathActions.SavePathSuccess(expected));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe((actual) => {
            expect(actual.paths.length).toEqual(pathsArray.length);
            expect(actual.paths[2]).toEqual(expected);
            expect(actual.error).toEqual('');
            expect(actual.currentPath).toEqual(null);
          });
      });
    });
  });
});
