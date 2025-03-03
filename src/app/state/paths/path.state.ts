import { Injectable, inject } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { Path } from '@models/paths';
import { PathActions } from './path.actions';
import { PathDataService } from '@services/path/path-data.service';

export interface PathStateModel {
  paths: Path[];
  currentPath: Path;
  error: string;
}

@State<PathStateModel>({
  name: 'paths',
  defaults: {
    paths: [],
    currentPath: null,
    error: '',
  },
})
@Injectable()
export class PathState {
  #pathDataService = inject(PathDataService);

  @Selector([PathState])
  static getPaths(state: PathStateModel): Path[] {
    return state.paths;
  }

  @Selector([PathState])
  static getError(state: PathStateModel): string {
    return state.error;
  }

  @Selector([PathState])
  static getCurrentPath(state: PathStateModel): Path {
    return state.currentPath;
  }

  @Action(PathActions.DeletePath)
  public delete({ dispatch, patchState }: StateContext<PathStateModel>, { payload }: PathActions.DeletePath) {
    patchState({
      error: '',
    });
    return this.#pathDataService.deletePath(payload).pipe(
      map((_path) => {
        return dispatch(new PathActions.DeletePathSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new PathActions.DeletePathFail(error));
      })
    );
  }

  @Action(PathActions.DeletePathFail)
  public deleteFail({ patchState }: StateContext<PathStateModel>, { payload }: PathActions.DeletePathFail) {
    patchState({
      currentPath: null,
      error: payload,
    });
  }

  @Action(PathActions.DeletePathSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<PathStateModel>,
    { payload }: PathActions.DeletePathSuccess
  ) {
    const state = getState();
    patchState({
      currentPath: null,
      paths: state.paths.filter((path) => path.id !== payload),
    });
  }

  @Action(PathActions.GetPath)
  public get({ dispatch, patchState }: StateContext<PathStateModel>, { payload }: PathActions.GetPath) {
    patchState({
      error: '',
    });
    return this.#pathDataService.getPath(payload).pipe(
      map((path: Path) => {
        return dispatch(new PathActions.GetPathSuccess(path));
      }),
      catchError((err) => {
        return dispatch(new PathActions.GetPathFail(err));
      })
    );
  }

  @Action(PathActions.GetPathFail)
  public getFail({ patchState }: StateContext<PathStateModel>, { payload }: PathActions.GetPathFail) {
    patchState({
      currentPath: null,
      error: payload,
    });
  }

  @Action(PathActions.GetPathSuccess)
  public getSuccess({ patchState }: StateContext<PathStateModel>, { payload }: PathActions.GetPathSuccess) {
    patchState({
      currentPath: payload,
      error: '',
    });
  }

  @Action(PathActions.NewPath)
  public newPath({ patchState }: StateContext<PathStateModel>) {
    const initPath = {
      id: null,
      name: '',
    };
    patchState({
      currentPath: initPath,
    });
  }

  @Action(PathActions.LoadPaths)
  public load({ dispatch, patchState }: StateContext<PathStateModel>) {
    patchState({
      error: '',
    });
    return this.#pathDataService.loadPaths().pipe(
      map((Paths: any[]) => {
        return dispatch(new PathActions.LoadPathsSuccess(Paths));
      }),
      catchError((err) => {
        return dispatch(new PathActions.LoadPathsFail(err));
      })
    );
  }

  @Action(PathActions.LoadPathsFail)
  public loadFail({ patchState }: StateContext<PathStateModel>, { payload }: PathActions.LoadPathsFail) {
    patchState({
      paths: [],
      error: payload,
    });
  }

  @Action(PathActions.LoadPathsSuccess)
  public loadSuccess({ patchState }: StateContext<PathStateModel>, { payload }: PathActions.LoadPathsSuccess) {
    patchState({
      paths: payload,
      error: '',
    });
  }

  @Action(PathActions.SavePath)
  public save({ dispatch, patchState }: StateContext<PathStateModel>, { payload }: PathActions.SavePath) {
    patchState({
      error: '',
    });
    return this.#pathDataService.savePath(payload).pipe(
      map((path: Path) => {
        return dispatch([new PathActions.SavePathSuccess(payload), new PathActions.LoadPaths()]);
      }),
      catchError((err) => {
        return dispatch(new PathActions.SavePathFail(err));
      })
    );
  }

  @Action(PathActions.SavePathFail)
  public saveFail({ patchState }: StateContext<PathStateModel>, { payload }: PathActions.SavePathFail) {
    patchState({
      error: payload,
    });
  }

  @Action(PathActions.SavePathSuccess)
  public saveSuccess({ getState, patchState }: StateContext<PathStateModel>, { payload }: PathActions.SavePathSuccess) {
    const state = getState();
    const updatedPaths = state.paths.map((item) => (payload.id === item.id ? payload : item));
    patchState({
      paths: updatedPaths,
      currentPath: null,
      error: '',
    });
  }
}
