import { Injectable, inject } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { User } from '@models/user';
import { UserActions } from './user.actions';
import { UserDataService } from '@services/user/user-data.service';

export interface UserStateModel {
  users: User[];
  currentUser: User;
  error: string;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    currentUser: null,
    error: '',
  },
})
@Injectable()
export class UserState {
  readonly #userDataService = inject(UserDataService);

  @Selector([UserState])
  static getUsers(state: UserStateModel): User[] {
    return state.users;
  }

  @Selector([UserState])
  static getError(state: UserStateModel): string {
    return state.error;
  }

  @Selector([UserState])
  static getCurrentUser(state: UserStateModel): User {
    return state.currentUser;
  }

  @Action(UserActions.DeleteUser)
  public delete({ dispatch, patchState }: StateContext<UserStateModel>, { payload }: UserActions.DeleteUser) {
    patchState({
      error: '',
    });
    return this.#userDataService.deleteUser(payload).pipe(
      map((user) => {
        return dispatch(new UserActions.DeleteUserSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new UserActions.DeleteUserFail(error));
      })
    );
  }

  @Action(UserActions.DeleteUserFail)
  public deleteFail({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.DeleteUserFail) {
    patchState({
      currentUser: null,
      error: payload,
    });
  }

  @Action(UserActions.DeleteUserSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: UserActions.DeleteUserSuccess
  ) {
    const state = getState();
    patchState({
      currentUser: null,
      users: state.users.filter((user) => user.id !== payload),
    });
  }

  @Action(UserActions.GetUser)
  public get({ dispatch, patchState }: StateContext<UserStateModel>, { payload }: UserActions.GetUser) {
    patchState({
      error: '',
    });
    return this.#userDataService.getUser(payload).pipe(
      map((User: User) => {
        return dispatch(new UserActions.GetUserSuccess(User));
      }),
      catchError((err) => {
        return dispatch(new UserActions.GetUserFail(err));
      })
    );
  }

  @Action(UserActions.GetUserFail)
  public getFail({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.GetUserFail) {
    patchState({
      currentUser: null,
      error: payload,
    });
  }

  @Action(UserActions.GetUserSuccess)
  public getSuccess({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.GetUserSuccess) {
    patchState({
      currentUser: payload,
      error: '',
    });
  }

  @Action(UserActions.LoadUsers)
  public load({ dispatch, patchState }: StateContext<UserStateModel>) {
    patchState({
      error: '',
    });
    return this.#userDataService.loadUsers().pipe(
      map((users: any[]) => {
        return dispatch(new UserActions.LoadUsersSuccess(users));
      }),
      catchError((err) => {
        return dispatch(new UserActions.LoadUsersFail(err));
      })
    );
  }

  @Action(UserActions.LoadUsersFail)
  public loadFail({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.LoadUsersFail) {
    patchState({
      users: [],
      error: payload,
    });
  }

  @Action(UserActions.LoadUsersSuccess)
  public loadSuccess({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.LoadUsersSuccess) {
    patchState({
      users: payload,
      error: '',
    });
  }

  @Action(UserActions.PatchUser)
  public patch({ dispatch, patchState }: StateContext<UserStateModel>, { id, payload }: UserActions.PatchUser) {
    patchState({
      error: '',
    });
    return this.#userDataService.patchUser(id, payload).pipe(
      map((user: User) => {
        return dispatch([new UserActions.LoadUsers(), new UserActions.PatchUserSuccess(user)]);
      }),
      catchError((err) => {
        return dispatch(new UserActions.PatchUserFail(err));
      })
    );
  }

  @Action(UserActions.PatchUserFail)
  public patchFail({ patchState }: StateContext<UserStateModel>, { payload }: UserActions.PatchUserFail) {
    patchState({
      error: payload,
    });
  }

  @Action(UserActions.PatchUserSuccess)
  public patchSuccess(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: UserActions.PatchUserSuccess
  ) {
    const state = getState();
    const updatedUsers = state.users.map((item) => (payload.id === item.id ? payload : item));
    patchState({
      users: updatedUsers,
      currentUser: null,
      error: '',
    });
  }
}
