import { User } from '../../shared/user';

export namespace UserActions {
  export class DeleteUser {
    static readonly type = '[Users] Delete User';
    constructor(public payload: number) {}
  }

  export class DeleteUserFail {
    static readonly type = '[Users] Delete User Fail';
    constructor(public payload: string) {}
  }

  export class DeleteUserSuccess {
    static readonly type = '[Users] Delete User Success';
    constructor(public payload: number) {}
  }

  export class GetUser {
    static readonly type = '[Users] Get Users';
    constructor(public payload: number) {}
  }

  export class GetUserFail {
    static readonly type = '[Users] Get Users Fail';
    constructor(public payload: string) {}
  }

  export class GetUserSuccess {
    static readonly type = '[Users] Get Users Success';
    constructor(public payload: User) {}
  }

  export class LoadUsers {
    static readonly type = '[Users] Load Users';
  }

  export class LoadUsersFail {
    static readonly type = '[Users] Load Users Fail';
    constructor(public payload: string) {}
  }

  export class LoadUsersSuccess {
    static readonly type = '[Users] Load Users Success';
    constructor(public payload: any[]) {}
  }

  export class PatchUser {
    static readonly type = '[Users] Patch User';
    constructor(public id: number, public payload: any) {}
  }

  export class PatchUserFail {
    static readonly type = '[Users] Patch User Fail';
    constructor(public payload: string) {}
  }

  export class PatchUserSuccess {
    static readonly type = '[Users] Patch User Success';
    constructor(public payload: any) {}
  }
}
