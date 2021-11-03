import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { DataServiceFacade } from '../../services/data-service-facade';
import { PathActions } from './paths.actions';
import { Path } from '../../shared/paths';

export interface PathsStateModel {
  paths: Path[];
  currentPath: Path;
  error: string;
}

@State<PathsStateModel>({
  name: 'paths',
  defaults: {
    paths: [],
    currentPath: null,
    error: '',
  },
})
@Injectable()
export class PathsState {
  constructor(private dataFacade: DataServiceFacade) {}

  @Selector()
  static getPaths(state: PathsStateModel) {
    return state.paths;
  }

  @Selector()
  static getError(state: PathsStateModel) {
    return state.error;
  }

  @Selector()
  static getCurrentPath(state: PathsStateModel) {
    return state.currentPath;
  }

  @Action(PathActions.DeletePath)
  public delete({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: PathActions.DeletePath) {
    patchState({
      error: '',
    });
    return this.dataFacade.deletePath(payload).pipe(
      map((_path) => {
        return dispatch(new PathActions.DeletePathSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new PathActions.DeletePathFail(error));
      })
    );
  }

  @Action(PathActions.DeletePathFail)
  public deleteFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathActions.DeletePathFail) {
    patchState({
      currentPath: null,
      error: payload,
    });
  }

  @Action(PathActions.DeletePathSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<PathsStateModel>,
    { payload }: PathActions.DeletePathSuccess
  ) {
    const state = getState();
    patchState({
      currentPath: null,
      paths: state.paths.filter((path) => path.id !== payload),
    });
  }

  @Action(PathActions.GetPath)
  public get({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: PathActions.GetPath) {
    patchState({
      error: '',
    });
    return this.dataFacade.getPath(payload).pipe(
      map((path: Path) => {
        return dispatch(new PathActions.GetPathSuccess(path));
      }),
      catchError((err) => {
        return dispatch(new PathActions.GetPathFail(err));
      })
    );
  }

  @Action(PathActions.GetPathFail)
  public getFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathActions.GetPathFail) {
    patchState({
      currentPath: null,
      error: payload,
    });
  }

  @Action(PathActions.GetPathSuccess)
  public getSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: PathActions.GetPathSuccess) {
    patchState({
      currentPath: payload,
      error: '',
    });
  }

  @Action(PathActions.NewPath)
  public newPath({ patchState }: StateContext<PathsStateModel>) {
    const initPath = {
      id: null,
      name: '',
    };
    patchState({
      currentPath: initPath,
    });
  }

  @Action(PathActions.LoadPaths)
  public load({ dispatch, patchState }: StateContext<PathsStateModel>) {
    patchState({
      error: '',
    });
    return this.dataFacade.loadPaths().pipe(
      map((Paths: any[]) => {
        return dispatch(new PathActions.LoadPathsSuccess(Paths));
      }),
      catchError((err) => {
        return dispatch(new PathActions.LoadPathsFail(err));
      })
    );
  }

  @Action(PathActions.LoadPathsFail)
  public loadFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathActions.LoadPathsFail) {
    patchState({
      paths: [],
      error: payload,
    });
  }

  @Action(PathActions.LoadPathsSuccess)
  public loadSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: PathActions.LoadPathsSuccess) {
    patchState({
      paths: payload,
      error: '',
    });
  }

  @Action(PathActions.SavePath)
  public save({ dispatch, getState, patchState }: StateContext<PathsStateModel>) {
    // , { payload }: Save) {
    const state = getState();
    patchState({
      error: '',
    });
    return this.dataFacade.savePath(state.currentPath).pipe(
      map((path: Path) => {
        return dispatch([new PathActions.SavePathSuccess(state.currentPath), new PathActions.LoadPaths()]);
      }),
      catchError((err) => {
        return dispatch(new PathActions.SavePathFail(err));
      })
    );
  }

  @Action(PathActions.SavePathFail)
  public saveFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathActions.SavePathFail) {
    patchState({
      error: payload,
    });
  }

  @Action(PathActions.SavePathSuccess)
  public saveSuccess(
    { getState, patchState }: StateContext<PathsStateModel>,
    { payload }: PathActions.SavePathSuccess
  ) {
    const state = getState();
    const updatedPaths = state.paths.map((item) => (payload.id === item.id ? payload : item));
    patchState({
      paths: updatedPaths,
      currentPath: null,
      error: '',
    });
  }
}
