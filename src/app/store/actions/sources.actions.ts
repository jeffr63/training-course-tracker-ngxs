import { Source } from './../../services/sources';

export enum SourcesActionTypes {
  DELETE = '[Sources] Delete Source',
  DELETE_SUCCESS = '[Sources] Delete Source Success',
  DELETE_FAIL = '[Sources] Delete Source Fail',

  GET = '[Sources] Get Sources',
  GET_SUCCESS = '[Sources] Get Source Success',
  GET_FAIL = '[Sources] Get Source Fail',

  NEW_SOURCE = '[Sources] New Sourse',

  LOAD = '[Sources] Load Sources',
  LOAD_SUCCESS = '[Sources] Load Sources Success',
  LOAD_FAIL = '[Sources] Load Sources Fail',

  SAVE = '[Sources] Save Source',
  SAVE_SUCCESS = '[Sources] Save Source Success',
  SAVE_FAIL = '[Sources] Save Source Fail',
}

export class Delete {
  static readonly type = SourcesActionTypes.DELETE;

  constructor(public payload: number) { }
}

export class DeleteFail {
  static readonly type = SourcesActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteSuccess {
  static readonly type = SourcesActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) { }
}

export class Get {
  static readonly type = SourcesActionTypes.GET;

  constructor(public payload: number) { }
}

export class GetFail {
  static readonly type = SourcesActionTypes.GET_FAIL;

  constructor(public payload: string) { }
}

export class GetSuccess {
  static readonly type = SourcesActionTypes.GET_SUCCESS;

  constructor(public payload: Source) { }
}

export class Load {
  static readonly type = SourcesActionTypes.LOAD;
}

export class LoadFail {
  static readonly type = SourcesActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class LoadSuccess {
  static readonly type = SourcesActionTypes.LOAD_SUCCESS;

  constructor(public payload: any[]) { }
}

export class NewSource {
  static readonly type = SourcesActionTypes.NEW_SOURCE;
}

export class Save {
  static readonly type = SourcesActionTypes.SAVE;

  // constructor(public payload: Source) { }
}

export class SaveFail {
  static readonly type = SourcesActionTypes.SAVE_FAIL;

  constructor(public payload: string) { }
}

export class SaveSuccess {
  static readonly type = SourcesActionTypes.SAVE_SUCCESS;

  constructor(public payload: Source) { }
}
