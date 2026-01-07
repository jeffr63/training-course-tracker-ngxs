import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { expect, it, describe, beforeEach, afterEach, vi, vitest } from 'vitest';
import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { UserData } from '@services/user/user-data';
import { UserActions } from './user.actions';
import { UserState, UserStateModel } from './user.state';
import { User } from '@models/user-interface';

const userArray: User[] = [
  { id: 1, name: 'Joe', email: 'joe@joe.com', password: 'abc', role: 'admin' },
  { id: 2, name: 'Joe', email: 'sam@joe.com', password: 'abc', role: 'user' },
  { id: 3, name: 'Jane', email: 'jane@joe.com', password: 'abc', role: 'user' },
];

const currentUser = {
  id: 1,
  name: 'Jane',
  email: 'jane@joe.com',
  password: 'abc',
  role: 'user',
};

interface AppModel {
  readonly users: UserStateModel;
}

describe('UsersState', () => {
  let store: Store;
  let service: UserData;
  let actions: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState])],
      providers: [UserData, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
    store = TestBed.inject(Store);
    service = TestBed.inject(UserData);
    actions = TestBed.inject(Actions);
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });

  it('should initialize values', () => {
    const UsersState: UserStateModel = {
      users: userArray,
      error: '',
      currentUser: null,
    };
    store.reset(UsersState);

    store
      .selectOnce((state: UserStateModel) => state.users)
      .subscribe((users: User[]) => {
        expect(users).toEqual(userArray);
      });
  });

  describe('Selector', () => {
    describe('getUsers', () => {
      it('should return an array of Users', async () => {
        const appState: AppModel = {
          users: {
            users: userArray,
            error: '',
            currentUser: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(UserState.getUsers(appState.users)).toEqual(userArray);
      });
    });

    describe('getcurrentUser', () => {
      it('should return an object', async () => {
        const appState: AppModel = {
          users: {
            users: [],
            error: '',
            currentUser: currentUser,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(UserState.getCurrentUser(appState.users)).toEqual(currentUser);
      });
    });

    describe('getError', () => {
      it('should return an string', async () => {
        const appState: AppModel = {
          users: {
            users: [],
            error: 'Error',
            currentUser: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        expect(UserState.getError(appState.users)).toEqual('Error');
      });
    });
  });

  describe('Action', () => {
    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', async () => {
        // arrange
        const action = new UserActions.DeleteUser(3);
        const expected = new UserActions.DeleteUserSuccess(3);
        const callbacksCalled = [];

        vi.spyOn(service, 'deleteUser').mockReturnValue(of(currentUser));

        // action
        actions.pipe(ofActionSuccessful(UserActions.DeleteUserSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch DeleteFail when errors', async () => {
        const action = new UserActions.DeleteUser(3);
        const expected = new UserActions.DeleteUserFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'deleteUser').mockReturnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.DeleteUserFail)).subscribe((x) => {
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
          users: {
            users: [],
            error: '',
            currentUser: currentUser,
          },
        };
        Promise.resolve().then(() => store.reset(appState));

        store.dispatch(new UserActions.DeleteUserFail('Error'));

        await vitest.runAllTimersAsync();

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentUser).toEqual(null);
          });
      });
    });

    describe('DeleteSuccess', () => {
      it('should remove requested item from users array', async () => {
        const appState: AppModel = {
          users: {
            users: userArray,
            error: '',
            currentUser: currentUser,
          },
        };
        Promise.resolve().then(() => store.reset(appState));

        store.dispatch(new UserActions.DeleteUserSuccess(3));

        await vitest.runAllTimersAsync();

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.users.length).toEqual(2);
            expect(actual.users[0].id).toBe(1);
            expect(actual.users[1].id).toBe(2);
            expect(actual.currentUser).toEqual(null);
          });
      });
    });

    describe('Get', () => {
      it('should dispatch GetSuccusss when successful', async () => {
        // arrange
        const action = new UserActions.GetUser(3);
        const expected = new UserActions.GetUserSuccess(currentUser);
        const callbacksCalled = [];

        vi.spyOn(service, 'getUser').mockReturnValue(of(currentUser));

        // action
        actions.pipe(ofActionSuccessful(UserActions.GetUserSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch GetFail when errors', async () => {
        const action = new UserActions.GetUser(3);
        const expected = new UserActions.GetUserFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'getUser').mockReturnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.GetUserFail)).subscribe((x) => {
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
          users: {
            users: [],
            error: '',
            currentUser: currentUser,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new UserActions.GetUserFail('Error'));

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
            expect(actual.currentUser).toEqual(null);
          });
      });
    });

    describe('GetSuccess', () => {
      it('should set currentUser with requested record and clear error', async () => {
        const appState: AppModel = {
          users: {
            users: [],
            error: 'Test',
            currentUser: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new UserActions.GetUserSuccess(currentUser));

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.currentUser).toEqual(currentUser);
            expect(actual.error).toEqual('');
          });
      });
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', async () => {
        // arrange
        const action = new UserActions.LoadUsers();
        const expected = new UserActions.LoadUsersSuccess(userArray);
        const callbacksCalled = [];

        vi.spyOn(service, 'loadUsers').mockReturnValue(of(userArray));

        // action
        actions.pipe(ofActionSuccessful(UserActions.LoadUsersSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch LoadFail when errors', async () => {
        const action = new UserActions.LoadUsers();
        const expected = new UserActions.LoadUsersFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'loadUsers').mockReturnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.LoadUsersFail)).subscribe((x) => {
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
          users: {
            users: userArray,
            error: '',
            currentUser: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new UserActions.LoadUsersFail('Error'));

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.users.length).toEqual(0);
            expect(actual.error).toEqual('Error');
          });
      });
    });

    describe('LoadSuccess', () => {
      it('should set the users array to returned values and clear error', async () => {
        const appState: AppModel = {
          users: {
            users: [],
            error: 'Test',
            currentUser: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new UserActions.LoadUsersSuccess(userArray));

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.users).toEqual(userArray);
            expect(actual.error).toEqual('');
          });
      });
    });

    describe('Patch', () => {
      it('should dispatch PatchSuccuss when successful', async () => {
        // arrange
        const patchUser: User = { id: 3, name: 'Joan', email: 'joan@joe.com', password: 'abc', role: 'user' };
        const appState: AppModel = {
          users: {
            users: userArray,
            error: '',
            currentUser: patchUser,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();
        const action = new UserActions.PatchUser(3, patchUser);
        const expected = new UserActions.PatchUserSuccess(patchUser);
        const callbacksCalled = [];

        vi.spyOn(service, 'patchUser').mockReturnValue(of(patchUser));
        vi.spyOn(service, 'loadUsers').mockReturnValue(of(userArray));

        // action
        actions.pipe(ofActionSuccessful(UserActions.PatchUserSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });

      it('should dispatch PatchFail when errors', async () => {
        // arrange
        const patchUser: User = { id: 3, name: 'Joan', email: 'joan@joe.com', password: 'abc', role: 'user' };
        const appState: AppModel = {
          users: {
            users: userArray,
            error: '',
            currentUser: patchUser,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();
        const action = new UserActions.PatchUser(3, patchUser);
        const expected = new UserActions.PatchUserFail('Error');
        const callbacksCalled = [];

        vi.spyOn(service, 'patchUser').mockReturnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.PatchUserFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        Promise.resolve().then(() => store.dispatch(action));
        await vitest.runAllTimersAsync();

        // assert
        expect(callbacksCalled).toEqual([expected]);
      });
    });

    describe('PatchFail', () => {
      it('should return string in Error', async () => {
        const appState: AppModel = {
          users: {
            users: [],
            error: '',
            currentUser: null,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        store.dispatch(new UserActions.PatchUserFail('Error'));

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.error).toEqual('Error');
          });
      });
    });

    describe('PatchSuccess', () => {
      it('should update the source array with new value', async () => {
        const appState: AppModel = {
          users: {
            users: userArray,
            error: 'Test',
            currentUser: currentUser,
          },
        };
        Promise.resolve().then(() => store.reset(appState));
        await vitest.runAllTimersAsync();

        const expected: User = {
          id: 3,
          name: 'Joan',
          email: 'joan@joe.com',
          password: 'abc',
          role: 'user',
        };
        store.dispatch(new UserActions.PatchUserSuccess(expected));

        store
          .selectOnce((state: AppModel) => state.users)
          .subscribe((actual) => {
            expect(actual.users.length).toEqual(userArray.length);
            expect(actual.users[2]).toEqual(expected);
            expect(actual.error).toEqual('');
            expect(actual.currentUser).toEqual(null);
          });
      });
    });
  });
});
