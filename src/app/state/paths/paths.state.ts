import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { DataServiceFacade } from '../../services/data-service-facade';
import { PathsActions } from './paths.actions';
import { Path } from '../../models/paths';

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

  @Selector([PathsState])
  static getPaths(state: PathsStateModel): Path[] {
    return state.paths;
  }

  @Selector([PathsState])
  static getError(state: PathsStateModel): string {
    return state.error;
  }

  @Selector([PathsState])
  static getCurrentPath(state: PathsStateModel): Path {
    return state.currentPath;
  }

  @Action(PathsActions.DeletePath)
  public delete({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.DeletePath) {
    patchState({
      error: '',
    });
    return this.dataFacade.deletePath(payload).pipe(
      map((_path) => {
        return dispatch(new PathsActions.DeletePathSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new PathsActions.DeletePathFail(error));
      })
    );
  }

  @Action(PathsActions.DeletePathFail)
  public deleteFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.DeletePathFail) {
    patchState({
      currentPath: null,
      error: payload,
    });
  }

  @Action(PathsActions.DeletePathSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<PathsStateModel>,
    { payload }: PathsActions.DeletePathSuccess
  ) {
    const state = getState();
    patchState({
      currentPath: null,
      paths: state.paths.filter((path) => path.id !== payload),
    });
  }

  @Action(PathsActions.GetPath)
  public get({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.GetPath) {
    patchState({
      error: '',
    });
    return this.dataFacade.getPath(payload).pipe(
      map((path: Path) => {
        return dispatch(new PathsActions.GetPathSuccess(path));
      }),
      catchError((err) => {
        return dispatch(new PathsActions.GetPathFail(err));
      })
    );
  }

  @Action(PathsActions.GetPathFail)
  public getFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.GetPathFail) {
    patchState({
      currentPath: null,
      error: payload,
    });
  }

  @Action(PathsActions.GetPathSuccess)
  public getSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.GetPathSuccess) {
    patchState({
      currentPath: payload,
      error: '',
    });
  }

  @Action(PathsActions.NewPath)
  public newPath({ patchState }: StateContext<PathsStateModel>) {
    const initPath = {
      id: null,
      name: '',
    };
    patchState({
      currentPath: initPath,
    });
  }

  @Action(PathsActions.LoadPaths)
  public load({ dispatch, patchState }: StateContext<PathsStateModel>) {
    patchState({
      error: '',
    });
    return this.dataFacade.loadPaths().pipe(
      map((Paths: any[]) => {
        return dispatch(new PathsActions.LoadPathsSuccess(Paths));
      }),
      catchError((err) => {
        return dispatch(new PathsActions.LoadPathsFail(err));
      })
    );
  }

  @Action(PathsActions.LoadPathsFail)
  public loadFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.LoadPathsFail) {
    patchState({
      paths: [],
      error: payload,
    });
  }

  @Action(PathsActions.LoadPathsSuccess)
  public loadSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.LoadPathsSuccess) {
    patchState({
      paths: payload,
      error: '',
    });
  }

  @Action(PathsActions.SavePath)
  public save({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.SavePath) {
    patchState({
      error: '',
    });
    return this.dataFacade.savePath(payload).pipe(
      map((path: Path) => {
        return dispatch([new PathsActions.SavePathSuccess(payload), new PathsActions.LoadPaths()]);
      }),
      catchError((err) => {
        return dispatch(new PathsActions.SavePathFail(err));
      })
    );
  }

  @Action(PathsActions.SavePathFail)
  public saveFail({ patchState }: StateContext<PathsStateModel>, { payload }: PathsActions.SavePathFail) {
    patchState({
      error: payload,
    });
  }

  @Action(PathsActions.SavePathSuccess)
  public saveSuccess(
    { getState, patchState }: StateContext<PathsStateModel>,
    { payload }: PathsActions.SavePathSuccess
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
