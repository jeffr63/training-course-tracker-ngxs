import { Source } from '../shared/sources';

export class Delete {
  static readonly type = '[Sources] Delete Source';
  constructor(public payload: number) { }
}

export class DeleteFail {
  static readonly type = '[Sources] Delete Source Fail';
  constructor(public payload: string) { }
}

export class DeleteSuccess {
  static readonly type = '[Sources] Delete Source Success';
  constructor(public payload: number) { }
}

export class Get {
  static readonly type = '[Sources] Get Sources';
  constructor(public payload: number) { }
}

export class GetFail {
  static readonly type = '[Sources] Get Sources Fail';
  constructor(public payload: string) { }
}

export class GetSuccess {
  static readonly type = '[Sources] Get Sources Success';
  constructor(public payload: Source) { }
}

export class Load {
  static readonly type = '[Sources] Load Sources';
}

export class LoadFail {
  static readonly type = '[Sources] Load Sources Fail';
  constructor(public payload: string) { }
}

export class LoadSuccess {
  static readonly type = '[Sources] Load Sources Success';
  constructor(public payload: any[]) { }
}

export class NewSource {
  static readonly type = '[Sources] New Source';
}

export class Save {
  static readonly type = '[Sources] Save Source';
  // constructor(public payload: Source) { }
}

export class SaveFail {
  static readonly type = '[Sources] Save Source Fail';
  constructor(public payload: string) { }
}

export class SaveSuccess {
  static readonly type = '[Sources] Save Source Success';
  constructor(public payload: Source) { }
}
