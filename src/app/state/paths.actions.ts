import { Path } from '../shared/paths';

export class Delete {
  static readonly type = '[Paths] Delete Path';
  constructor(public payload: number) { }
}

export class DeleteFail {
  static readonly type = '[Paths] Delete Path Fail';
  constructor(public payload: string) { }
}

export class DeleteSuccess {
  static readonly type = '[Paths] Delete Path Success';
  constructor(public payload: number) { }
}

export class Get {
  static readonly type = '[Paths] Get Path';
  constructor(public payload: number) { }
}

export class GetFail {
  static readonly type = '[Paths] Get Path Fail';
  constructor(public payload: string) { }
}

export class GetSuccess {
  static readonly type = '[Paths] Get Path Success';
  constructor(public payload: Path) { }
}

export class Load {
  static readonly type = '[Paths] Load Paths';
}

export class LoadFail {
  static readonly type = '[Paths] Load Paths Fail';
  constructor(public payload: string) { }
}

export class LoadSuccess {
  static readonly type = '[Paths] Load Paths Success';
  constructor(public payload: Path[]) { }
}

export class NewPath {
  static readonly type = '[Paths] New Path';
}

export class Save {
  static readonly type = '[Paths] Save Path';
  // constructor(public payload: Path) { }
}

export class SaveFail {
  static readonly type = '[Paths] Save Path Fail';
  constructor(public payload: string) { }
}

export class SaveSuccess {
  static readonly type = '[Paths] Save Path Success';
  constructor(public payload: Path) { }
}
