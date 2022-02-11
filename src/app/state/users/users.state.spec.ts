import { TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { DataServiceFacade } from '../../services/data-service-facade';
import { UserActions } from './users.actions';
import { UsersState, UsersStateModel } from './users.state';
import { User } from '../../shared/user';

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
  readonly users: UsersStateModel;
}

describe('UsersState', () => {
  let store: Store;
  let service: DataServiceFacade;
  let actions: Actions;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([UsersState]), HttpClientModule],
        providers: [DataServiceFacade],
      }).compileComponents();
      store = TestBed.inject(Store);
      service = TestBed.inject(DataServiceFacade);
      actions = TestBed.inject(Actions);
    })
  );

  it('should initialize values', () => {
    const UsersState: UsersStateModel = {
      users: userArray,
      error: '',
      currentUser: null,
    };
    store.reset(UsersState);

    store
      .selectOnce((state: UsersStateModel) => state.users)
      .subscribe((users: User[]) => {
        expect(users).toEqual(userArray);
      });
  });

  describe('Selector', () => {
    describe('getUsers', () => {
      it(
        'should return an array of Users',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: userArray,
              error: '',
              currentUser: null,
            },
          };
          store.reset(appState);

          expect(UsersState.getUsers(appState.users)).toEqual(userArray);
        })
      );
    });

    describe('getcurrentUser', () => {
      it(
        'should return an object',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: [],
              error: '',
              currentUser: currentUser,
            },
          };
          store.reset(appState);

          expect(UsersState.getCurrentUser(appState.users)).toEqual(currentUser);
        })
      );
    });

    describe('getError', () => {
      it(
        'should return an string',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: [],
              error: 'Error',
              currentUser: null,
            },
          };
          store.reset(appState);

          expect(UsersState.getError(appState.users)).toEqual('Error');
        })
      );
    });
  });

  describe('Action', () => {
    describe('Delete', () => {
      it('should dispatch DeleteSuccess when successful', fakeAsync(() => {
        // arrange
        const action = new UserActions.DeleteUser(3);
        const expected = new UserActions.DeleteUserSuccess(3);
        const callbacksCalled = [];

        spyOn(service, 'deleteUser').and.returnValue(of(currentUser));

        // action
        actions.pipe(ofActionSuccessful(UserActions.DeleteUserSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch DeleteFail when errors', fakeAsync(() => {
        const action = new UserActions.DeleteUser(3);
        const expected = new UserActions.DeleteUserFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'deleteUser').and.returnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.DeleteUserFail)).subscribe((x) => {
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
            users: {
              users: [],
              error: '',
              currentUser: currentUser,
            },
          };
          store.reset(appState);

          store.dispatch(new UserActions.DeleteUserFail('Error'));

          store
            .selectOnce((state: AppModel) => state.users)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
              expect(actual.currentUser).toEqual(null);
            });
        })
      );
    });

    describe('DeleteSuccess', () => {
      it(
        'should remove requested item from users array',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: userArray,
              error: '',
              currentUser: currentUser,
            },
          };
          store.reset(appState);

          store.dispatch(new UserActions.DeleteUserSuccess(3));

          store
            .selectOnce((state: AppModel) => state.users)
            .subscribe((actual) => {
              expect(actual.users.length).toEqual(2);
              expect(actual.users[0].id).toBe(1);
              expect(actual.users[1].id).toBe(2);
              expect(actual.currentUser).toEqual(null);
            });
        })
      );
    });

    describe('Get', () => {
      it('should dispatch GetSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new UserActions.GetUser(3);
        const expected = new UserActions.GetUserSuccess(currentUser);
        const callbacksCalled = [];

        spyOn(service, 'getUser').and.returnValue(of(currentUser));

        // action
        actions.pipe(ofActionSuccessful(UserActions.GetUserSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch GetFail when errors', fakeAsync(() => {
        const action = new UserActions.GetUser(3);
        const expected = new UserActions.GetUserFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'getUser').and.returnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.GetUserFail)).subscribe((x) => {
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
            users: {
              users: [],
              error: '',
              currentUser: currentUser,
            },
          };
          store.reset(appState);

          store.dispatch(new UserActions.GetUserFail('Error'));

          store
            .selectOnce((state: AppModel) => state.users)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
              expect(actual.currentUser).toEqual(null);
            });
        })
      );
    });

    describe('GetSuccess', () => {
      it(
        'should set currentUser with requested record and clear error',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: [],
              error: 'Test',
              currentUser: null,
            },
          };
          store.reset(appState);

          store.dispatch(new UserActions.GetUserSuccess(currentUser));

          store
            .selectOnce((state: AppModel) => state.users)
            .subscribe((actual) => {
              expect(actual.currentUser).toEqual(currentUser);
              expect(actual.error).toEqual('');
            });
        })
      );
    });

    describe('Load', () => {
      it('should dispatch LoadSuccusss when successful', fakeAsync(() => {
        // arrange
        const action = new UserActions.LoadUsers();
        const expected = new UserActions.LoadUsersSuccess(userArray);
        const callbacksCalled = [];

        spyOn(service, 'loadUsers').and.returnValue(of(userArray));

        // action
        actions.pipe(ofActionSuccessful(UserActions.LoadUsersSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch LoadFail when errors', fakeAsync(() => {
        const action = new UserActions.LoadUsers();
        const expected = new UserActions.LoadUsersFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'loadUsers').and.returnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.LoadUsersFail)).subscribe((x) => {
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
            users: {
              users: userArray,
              error: '',
              currentUser: null,
            },
          };
          store.reset(appState);

          store.dispatch(new UserActions.LoadUsersFail('Error'));

          store
            .selectOnce((state: AppModel) => state.users)
            .subscribe((actual) => {
              expect(actual.users.length).toEqual(0);
              expect(actual.error).toEqual('Error');
            });
        })
      );
    });

    describe('LoadSuccess', () => {
      it(
        'should set the users array to returned values and clear error',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: [],
              error: 'Test',
              currentUser: null,
            },
          };
          store.reset(appState);

          store.dispatch(new UserActions.LoadUsersSuccess(userArray));

          store
            .selectOnce((state: AppModel) => state.users)
            .subscribe((actual) => {
              expect(actual.users).toEqual(userArray);
              expect(actual.error).toEqual('');
            });
        })
      );
    });

    describe('Patch', () => {
      it('should dispatch PatchSuccuss when successful', fakeAsync(() => {
        // arrange
        const patchUser: User = { id: 3, name: 'Joan', email: 'joan@joe.com', password: 'abc', role: 'user' };
        const appState: AppModel = {
          users: {
            users: userArray,
            error: '',
            currentUser: patchUser,
          },
        };
        store.reset(appState);
        const action = new UserActions.PatchUser();
        const expected = new UserActions.PatchUserSuccess(patchUser);
        const callbacksCalled = [];

        spyOn(service, 'patchUser').and.returnValue(of(currentUser));
        spyOn(service, 'loadUsers').and.returnValue(of(userArray));

        // action
        actions.pipe(ofActionSuccessful(UserActions.PatchUserSuccess)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));

      it('should dispatch PatchFail when errors', fakeAsync(() => {
        // arrange
        const patchUser: User = { id: 3, name: 'Joan', email: 'joan@joe.com', password: 'abc', role: 'user' };
        const appState: AppModel = {
          users: {
            users: userArray,
            error: '',
            currentUser: patchUser,
          },
        };
        store.reset(appState);
        const action = new UserActions.PatchUser();
        const expected = new UserActions.PatchUserFail('Error');
        const callbacksCalled = [];

        spyOn(service, 'patchUser').and.returnValue(throwError(() => 'Error'));

        // action
        actions.pipe(ofActionSuccessful(UserActions.PatchUserFail)).subscribe((x) => {
          callbacksCalled.push(x);
        });

        store.dispatch(action);
        tick(1);

        // assert
        expect(callbacksCalled).toEqual([expected]);
      }));
    });

    describe('PatchFail', () => {
      it(
        'should return string in Error',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: [],
              error: '',
              currentUser: null,
            },
          };
          store.reset(appState);

          store.dispatch(new UserActions.PatchUserFail('Error'));

          store
            .selectOnce((state: AppModel) => state.users)
            .subscribe((actual) => {
              expect(actual.error).toEqual('Error');
            });
        })
      );
    });

    describe('PatchSuccess', () => {
      it(
        'should update the source array with new value',
        waitForAsync(() => {
          const appState: AppModel = {
            users: {
              users: userArray,
              error: 'Test',
              currentUser: currentUser,
            },
          };
          store.reset(appState);

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
        })
      );
    });
  });
});
