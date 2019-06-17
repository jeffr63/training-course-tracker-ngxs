import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import {
  DeletePath, DeletePathFail, DeletePathSuccess,
  GetPath, GetPathFail, GetPathSuccess,
  LoadPaths, LoadPathsFail, LoadPathsSuccess, NewPath,
  SavePath, SavePathFail, SavePathSuccess
} from './paths.actions';
import { PathsService } from '../services/paths.service';
import { Path } from '../shared/paths';

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
  }
})
export class PathsState {

  constructor(private pathsService: PathsService) { }

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

  @Action(DeletePath)
  public delete({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: DeletePath) {
    patchState({
      error: ''
    });
    return this.pathsService.deletePath(payload).pipe(
      map(_path => {
        return dispatch(new DeletePathSuccess(payload));
      }),
      catchError(error => {
        return dispatch(new DeletePathFail(error));
      })
    );
  }

  @Action(DeletePathFail)
  public deleteFail({ patchState }: StateContext<PathsStateModel>, { payload }: DeletePathFail) {
    patchState({
      currentPath: null,
      error: payload
    });
  }

  @Action(DeletePathSuccess)
  public deleteSuccess({ getState, patchState }: StateContext<PathsStateModel>, { payload }: DeletePathSuccess) {
    const state = getState();
    patchState({
      currentPath: null,
      paths: state.paths.filter(path => path.id !== payload)
    });
  }

  @Action(GetPath)
  public get({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: GetPath) {
    patchState({
      error: ''
    });
    return this.pathsService.getPath(payload).pipe(
      map((path: Path) => {
        return dispatch(new GetPathSuccess(path));
      }),
      catchError(err => {
        return dispatch(new GetPathFail(err));
      })
    );
  }

  @Action(GetPathFail)
  public getFail({ patchState }: StateContext<PathsStateModel>, { payload }: GetPathFail) {
    patchState({
      currentPath: null,
      error: payload
    });
  }

  @Action(GetPathSuccess)
  public getSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: GetPathSuccess) {
    patchState({
      currentPath: payload,
      error: ''
    });
  }

  @Action(NewPath)
  public newPath({ patchState }: StateContext<PathsStateModel>) {
    const initPath = {
      id: null,
      name: ''
    };
    patchState({
      currentPath: initPath
    });
  }

  @Action(LoadPaths)
  public load({ dispatch, patchState }: StateContext<PathsStateModel>) {
    patchState({
      error: ''
    });
    return this.pathsService.loadPaths().pipe(
      map((Paths: any[]) => {
        return dispatch(new LoadPathsSuccess(Paths));
      }),
      catchError(err => {
        return dispatch(new LoadPathsFail(err));
      })
    );
  }

  @Action(LoadPathsFail)
  public loadFail({ patchState }: StateContext<PathsStateModel>, { payload }: LoadPathsFail) {
    patchState({
      paths: [],
      error: payload
    });
  }

  @Action(LoadPathsSuccess)
  public loadSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: LoadPathsSuccess) {
    patchState({
      paths: payload,
      error: ''
    });
  }

  @Action(SavePath)
  public save({ dispatch, getState, patchState }: StateContext<PathsStateModel>) { // , { payload }: Save) {
    const state = getState();
    patchState({
      error: ''
    });
    return this.pathsService.savePath(state.currentPath).pipe(
      map((path: Path) => {
        return dispatch([
          new SavePathSuccess(state.currentPath),
          new LoadPaths()
        ]);
      }),
      catchError(err => {
        return dispatch(new SavePathFail(err));
      })
    );
  }

  @Action(SavePathFail)
  public saveFail({ patchState }: StateContext<PathsStateModel>, { payload }: SavePathFail) {
    patchState({
      error: payload
    });
  }

  @Action(SavePathSuccess)
  public saveSuccess({ getState, patchState }: StateContext<PathsStateModel>, { payload }: SavePathSuccess) {
    const state = getState();
    const updatedPaths = state.paths.map(
      item => payload.id === item.id ? payload : item);
    patchState({
      paths: updatedPaths,
      currentPath: null,
      error: ''
    });
  }

}
