import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store } from '@ngxs/store';

import { PathsState, PathsStateModel } from './paths.state';
import { PathsService } from '../services/paths.service';
import { Path } from '../services/paths';
import {
  DeleteFail, DeleteSuccess, GetFail, GetSuccess,
  LoadFail, LoadSuccess, NewPath, SaveFail, SaveSuccess
} from './paths.actions';

const pathsArray: Path[] = [
  { id: 1, name: 'ABC' },
  { id: 2, name: 'DEF' },
  { id: 3, name: 'GHI' }
];

const currentPath = {
  id: 1, name: 'ABC'
};

interface AppModel {
  readonly paths: PathsStateModel;
}

describe('Paths', () => {
  let store: Store;
  let service: PathsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([PathsState]),
        HttpClientModule
      ],
      providers: []
    }).compileComponents();
    store = TestBed.get(Store);
    service = TestBed.get(PathsService);
  }));

  it('should initialize values', () => {
    const pathsState: PathsStateModel = {
      paths: pathsArray,
      error: '',
      currentPath: null
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

      it('should return an array of Paths', async(() => {
        const appState: AppModel = {
          paths: {
            paths: pathsArray,
            error: '',
            currentPath: null
          }
        };
        store.reset(appState);

        expect(PathsState.getPaths(appState.paths)).toEqual(pathsArray);
      }));
    });

    describe('getCurrentPath', () => {
      it('should return an object', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath
          }
        };
        store.reset(appState);

        expect(PathsState.getCurrentPath(appState.paths)).toEqual(currentPath);
      }));
    });

    describe('getError', () => {
      it('should return an string', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: 'Error',
            currentPath: null
          }
        };
        store.reset(appState);

        expect(PathsState.getError(appState.paths)).toEqual('Error');
      }));
    });

  });

  describe('Action', () => {

    describe('DeleteFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath
          }
        };
        store.reset(appState);

        store.dispatch(new DeleteFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentPath).toEqual(null);
          });
      }));
    });

    describe('DeleteSuccess', () => {
      it('should remove requested item from paths array', async(() => {
        const appState: AppModel = {
          paths: {
            paths: pathsArray,
            error: '',
            currentPath: currentPath
          }
        };
        store.reset(appState);

        store.dispatch(new DeleteSuccess(3));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.paths.length).toEqual(2);
            expect(actual.paths[0].id).toBe(1);
            expect(actual.paths[1].id).toBe(2);
            expect(actual.currentPath).toEqual(null);
          });
      }));
    });

    describe('GetFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: currentPath
          }
        };
        store.reset(appState);

        store.dispatch(new GetFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentPath).toEqual(null);
          });
      }));
    });

    describe('GetSuccess', () => {
      it('should set currentPath with requested record and clear error', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: 'Test',
            currentPath: null
          }
        };
        store.reset(appState);

        store.dispatch(new GetSuccess(currentPath));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.currentPath).toEqual(currentPath);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('New Path', () => {
      it('should initialize currentPath values for a new record', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: null
          }
        };
        store.reset(appState);

        store.dispatch(new NewPath());

        store
          .selectOnce((state: AppModel) => state.paths.currentPath)
          .subscribe(current => {
            expect(current.id).toEqual(null);
            expect(current.name).toEqual('');
          });
      }));
    });

    describe('LoadFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          paths: {
            paths: pathsArray,
            error: '',
            currentPath: null
          }
        };
        store.reset(appState);

        store.dispatch(new LoadFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.paths.length).toEqual(0);
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('LoadSuccess', () => {
      it('should set the paths array to returned values and clear error', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: 'Test',
            currentPath: null
          }
        };
        store.reset(appState);

        store.dispatch(new LoadSuccess(pathsArray));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.paths).toEqual(pathsArray);
            expect(actual.error).toEqual('');
          });
      }));
    });

    describe('SaveFail', () => {
      it('should return string in Error', async(() => {
        const appState: AppModel = {
          paths: {
            paths: [],
            error: '',
            currentPath: null
          }
        };
        store.reset(appState);

        store.dispatch(new SaveFail('Error'));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.error).toEqual('Error');
          });
      }));
    });

    describe('SaveSuccess', () => {
      it('should update the path array with new value', async(() => {
        const appState: AppModel = {
          paths: {
            paths: pathsArray,
            error: 'Test',
            currentPath: currentPath
          }
        };
        store.reset(appState);

        const expected: Path = {
          id: 3,
          name: 'XYZ'
        };
        store.dispatch(new SaveSuccess(expected));

        store
          .selectOnce((state: AppModel) => state.paths)
          .subscribe(actual => {
            expect(actual.paths.length).toEqual(pathsArray.length);
            expect(actual.paths[2]).toEqual(expected);
            expect(actual.error).toEqual('');
            expect(actual.currentPath).toEqual(null);
          });
      }));
    });

  });

});
