import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { DataServiceFacade } from '../../services/data-service-facade';
import { UserActions } from './users.actions';
import { User } from '../../shared/user';

export interface UsersStateModel {
  users: User[];
  currentUser: User;
  error: string;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
    currentUser: null,
    error: '',
  },
})
@Injectable()
export class UsersState {
  constructor(private dataFacade: DataServiceFacade) {}

  @Selector([UsersState])
  static getUsers(state: UsersStateModel): User[] {
    return state.users;
  }

  @Selector([UsersState])
  static getError(state: UsersStateModel): string {
    return state.error;
  }

  @Selector([UsersState])
  static getCurrentUser(state: UsersStateModel): User {
    return state.currentUser;
  }

  @Action(UserActions.DeleteUser)
  public delete({ dispatch, patchState }: StateContext<UsersStateModel>, { payload }: UserActions.DeleteUser) {
    patchState({
      error: '',
    });
    return this.dataFacade.deleteUser(payload).pipe(
      map((user) => {
        return dispatch(new UserActions.DeleteUserSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new UserActions.DeleteUserFail(error));
      })
    );
  }

  @Action(UserActions.DeleteUserFail)
  public deleteFail({ patchState }: StateContext<UsersStateModel>, { payload }: UserActions.DeleteUserFail) {
    patchState({
      currentUser: null,
      error: payload,
    });
  }

  @Action(UserActions.DeleteUserSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<UsersStateModel>,
    { payload }: UserActions.DeleteUserSuccess
  ) {
    const state = getState();
    patchState({
      currentUser: null,
      users: state.users.filter((user) => user.id !== payload),
    });
  }

  @Action(UserActions.GetUser)
  public get({ dispatch, patchState }: StateContext<UsersStateModel>, { payload }: UserActions.GetUser) {
    patchState({
      error: '',
    });
    return this.dataFacade.getUser(payload).pipe(
      map((User: User) => {
        return dispatch(new UserActions.GetUserSuccess(User));
      }),
      catchError((err) => {
        return dispatch(new UserActions.GetUserFail(err));
      })
    );
  }

  @Action(UserActions.GetUserFail)
  public getFail({ patchState }: StateContext<UsersStateModel>, { payload }: UserActions.GetUserFail) {
    patchState({
      currentUser: null,
      error: payload,
    });
  }

  @Action(UserActions.GetUserSuccess)
  public getSuccess({ patchState }: StateContext<UsersStateModel>, { payload }: UserActions.GetUserSuccess) {
    patchState({
      currentUser: payload,
      error: '',
    });
  }

  @Action(UserActions.LoadUsers)
  public load({ dispatch, patchState }: StateContext<UsersStateModel>) {
    patchState({
      error: '',
    });
    return this.dataFacade.loadUsers().pipe(
      map((users: any[]) => {
        return dispatch(new UserActions.LoadUsersSuccess(users));
      }),
      catchError((err) => {
        return dispatch(new UserActions.LoadUsersFail(err));
      })
    );
  }

  @Action(UserActions.LoadUsersFail)
  public loadFail({ patchState }: StateContext<UsersStateModel>, { payload }: UserActions.LoadUsersFail) {
    patchState({
      users: [],
      error: payload,
    });
  }

  @Action(UserActions.LoadUsersSuccess)
  public loadSuccess({ patchState }: StateContext<UsersStateModel>, { payload }: UserActions.LoadUsersSuccess) {
    patchState({
      users: payload,
      error: '',
    });
  }

  @Action(UserActions.PatchUser)
  public patch({ dispatch, patchState }: StateContext<UsersStateModel>, { id, payload }: UserActions.PatchUser) {
    patchState({
      error: '',
    });
    return this.dataFacade.patchUser(id, payload).pipe(
      map((user: User) => {
        return dispatch([new UserActions.LoadUsers(), new UserActions.PatchUserSuccess(user)]);
      }),
      catchError((err) => {
        return dispatch(new UserActions.PatchUserFail(err));
      })
    );
  }

  @Action(UserActions.PatchUserFail)
  public patchFail({ patchState }: StateContext<UsersStateModel>, { payload }: UserActions.PatchUserFail) {
    patchState({
      error: payload,
    });
  }

  @Action(UserActions.PatchUserSuccess)
  public patchSuccess(
    { getState, patchState }: StateContext<UsersStateModel>,
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
