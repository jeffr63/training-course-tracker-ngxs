import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { Path } from '../shared/paths';
import { PathsService } from '../services/paths.service';
import {
  Delete, DeleteSuccess, DeleteFail,
  Get, GetSuccess, GetFail,
  Load, LoadSuccess, LoadFail,
  Save, SaveSuccess, SaveFail, NewPath
} from './paths.actions';

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

  @Action(Delete)
  public delete({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: Delete) {
    patchState({
      error: ''
    });
    return this.pathsService.delete(payload).pipe(
      map(_path => {
        return dispatch(new DeleteSuccess(payload));
      }),
      catchError(error => {
        return dispatch(new DeleteFail(error));
      })
    );
  }

  @Action(DeleteFail)
  public deleteFail({ patchState }: StateContext<PathsStateModel>, { payload }: DeleteFail) {
    patchState({
      currentPath: null,
      error: payload
    });
  }

  @Action(DeleteSuccess)
  public deleteSuccess({ getState, patchState }: StateContext<PathsStateModel>, { payload }: DeleteSuccess) {
    const state = getState();
    patchState({
      currentPath: null,
      paths: state.paths.filter(path => path.id !== payload)
    });
  }

  @Action(Get)
  public get({ dispatch, patchState }: StateContext<PathsStateModel>, { payload }: Get) {
    patchState({
      error: ''
    });
    return this.pathsService.get(payload).pipe(
      map((path: Path) => {
        return dispatch(new GetSuccess(path));
      }),
      catchError(err => {
        return dispatch(new GetFail(err));
      })
    );
  }

  @Action(GetFail)
  public getFail({ patchState }: StateContext<PathsStateModel>, { payload }: GetFail) {
    patchState({
      currentPath: null,
      error: payload
    });
  }

  @Action(GetSuccess)
  public getSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: GetSuccess) {
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

  @Action(Load)
  public load({ dispatch, patchState }: StateContext<PathsStateModel>) {
    patchState({
      error: ''
    });
    return this.pathsService.load().pipe(
      map((Paths: any[]) => {
        return dispatch(new LoadSuccess(Paths));
      }),
      catchError(err => {
        return dispatch(new LoadFail(err));
      })
    );
  }

  @Action(LoadFail)
  public loadFail({ patchState }: StateContext<PathsStateModel>, { payload }: LoadFail) {
    patchState({
      paths: [],
      error: payload
    });
  }

  @Action(LoadSuccess)
  public loadSuccess({ patchState }: StateContext<PathsStateModel>, { payload }: LoadSuccess) {
    patchState({
      paths: payload,
      error: ''
    });
  }

  @Action(Save)
  public save({ dispatch, getState, patchState }: StateContext<PathsStateModel>) { // , { payload }: Save) {
    const state = getState();
    patchState({
      error: ''
    });
    return this.pathsService.save(state.currentPath).pipe(
      map((path: Path) => {
        return dispatch([
          new SaveSuccess(state.currentPath),
          new Load()
        ]);
      }),
      catchError(err => {
        return dispatch(new SaveFail(err));
      })
    );
  }

  @Action(SaveFail)
  public saveFail({ patchState }: StateContext<PathsStateModel>, { payload }: SaveFail) {
    patchState({
      error: payload
    });
  }

  @Action(SaveSuccess)
  public saveSuccess({ getState, patchState }: StateContext<PathsStateModel>, { payload }: SaveSuccess) {
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
