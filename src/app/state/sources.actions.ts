import { Source } from '../shared/sources';

export class DeleteSource {
  static readonly type = '[Sources] Delete Source';
  constructor(public payload: number) { }
}

export class DeleteSourceFail {
  static readonly type = '[Sources] Delete Source Fail';
  constructor(public payload: string) { }
}

export class DeleteSourceSuccess {
  static readonly type = '[Sources] Delete Source Success';
  constructor(public payload: number) { }
}

export class GetSource {
  static readonly type = '[Sources] Get Sources';
  constructor(public payload: number) { }
}

export class GetSourceFail {
  static readonly type = '[Sources] Get Sources Fail';
  constructor(public payload: string) { }
}

export class GetSourceSuccess {
  static readonly type = '[Sources] Get Sources Success';
  constructor(public payload: Source) { }
}

export class LoadSources {
  static readonly type = '[Sources] Load Sources';
}

export class LoadSourcesFail {
  static readonly type = '[Sources] Load Sources Fail';
  constructor(public payload: string) { }
}

export class LoadSourcesSuccess {
  static readonly type = '[Sources] Load Sources Success';
  constructor(public payload: any[]) { }
}

export class NewSource {
  static readonly type = '[Sources] New Source';
}

export class SaveSource {
  static readonly type = '[Sources] Save Source';
  // constructor(public payload: Source) { }
}

export class SaveSourceFail {
  static readonly type = '[Sources] Save Source Fail';
  constructor(public payload: string) { }
}

export class SaveSourceSuccess {
  static readonly type = '[Sources] Save Source Success';
  constructor(public payload: Source) { }
}
