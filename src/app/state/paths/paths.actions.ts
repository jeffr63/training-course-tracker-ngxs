import { Path } from '../../shared/paths';

export namespace PathsActions {
  export class DeletePath {
    static readonly type = '[Paths] Delete Path';
    constructor(public payload: number) {}
  }

  export class DeletePathFail {
    static readonly type = '[Paths] Delete Path Fail';
    constructor(public payload: string) {}
  }

  export class DeletePathSuccess {
    static readonly type = '[Paths] Delete Path Success';
    constructor(public payload: number) {}
  }

  export class GetPath {
    static readonly type = '[Paths] Get Path';
    constructor(public payload: number) {}
  }

  export class GetPathFail {
    static readonly type = '[Paths] Get Path Fail';
    constructor(public payload: string) {}
  }

  export class GetPathSuccess {
    static readonly type = '[Paths] Get Path Success';
    constructor(public payload: Path) {}
  }

  export class LoadPaths {
    static readonly type = '[Paths] Load Paths';
  }

  export class LoadPathsFail {
    static readonly type = '[Paths] Load Paths Fail';
    constructor(public payload: string) {}
  }

  export class LoadPathsSuccess {
    static readonly type = '[Paths] Load Paths Success';
    constructor(public payload: Path[]) {}
  }

  export class NewPath {
    static readonly type = '[Paths] New Path';
  }

  export class SavePath {
    static readonly type = '[Paths] Save Path';
    // constructor(public payload: Path) { }
  }

  export class SavePathFail {
    static readonly type = '[Paths] Save Path Fail';
    constructor(public payload: string) {}
  }

  export class SavePathSuccess {
    static readonly type = '[Paths] Save Path Success';
    constructor(public payload: Path) {}
  }
}
