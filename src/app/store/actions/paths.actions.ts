import { Path } from './../../services/paths';

export enum PathsActionTypes {
  DELETE = '[Paths] Delete Path',
  DELETE_FAIL = '[Paths] Delete Path Fail',
  DELETE_SUCCESS = '[Paths] Delete Path Success',

  GET = '[Paths] Get Path',
  GET_SUCCESS = '[Paths] Get Path Success',
  GET_FAIL = '[Paths] Get Path Fail',

  NEW_PATH = '[Paths] New Path',

  LOAD = '[Paths] Load Paths',
  LOAD_FAIL = '[Paths] Load Paths Fail',
  LOAD_SUCCESS = '[Paths] Load Paths Success',

  SAVE = '[Paths] Save Path',
  SAVE_FAIL = '[Paths] Save Path Fail',
  SAVE_SUCCESS = '[Paths] Save Path Success',
}

export class Delete {
  static readonly type = PathsActionTypes.DELETE;

  constructor(public payload: number) { }
}

export class DeleteFail {
  static readonly type = PathsActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteSuccess {
  static readonly type = PathsActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) { }
}

export class Get {
  static readonly type = PathsActionTypes.GET;

  constructor(public payload: number) { }
}

export class GetFail {
  static readonly type = PathsActionTypes.GET_FAIL;

  constructor(public payload: string) { }
}

export class GetSuccess {
  static readonly type = PathsActionTypes.GET_SUCCESS;

  constructor(public payload: Path) { }
}

export class Load {
  static readonly type = PathsActionTypes.LOAD;
}

export class LoadFail {
  static readonly type = PathsActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class LoadSuccess {
  static readonly type = PathsActionTypes.LOAD_SUCCESS;

  constructor(public payload: Path[]) { }
}

export class NewPath {
  static readonly type = PathsActionTypes.NEW_PATH;
}

export class Save {
  static readonly type = PathsActionTypes.SAVE;

  // constructor(public payload: Path) { }
}

export class SaveFail {
  static readonly type = PathsActionTypes.SAVE_FAIL;

  constructor(public payload: string) { }
}

export class SaveSuccess {
  static readonly type = PathsActionTypes.SAVE_SUCCESS;

  constructor(public payload: Path) { }
}
