import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { Source } from './../../services/sources';
import { SourcesService } from './../../services/sources.service';
import {
  Delete, DeleteSuccess, DeleteFail,
  Get, GetSuccess, GetFail,
  Load, LoadSuccess, LoadFail,
  Save, SaveSuccess, SaveFail, NewSource
} from '../actions/sources.actions';

export interface SourcesStateModel {
  sources: Source[];
  currentSource: Source;
  error: string;
}

@State<SourcesStateModel>({
  name: 'sources',
  defaults: {
    sources: [],
    currentSource: null,
    error: '',
  }
})
export class SourcesState {

  constructor(private sourcesService: SourcesService) { }

  @Selector()
  static getSources(state: SourcesStateModel) {
    return state.sources;
  }

  @Selector()
  static getError(state: SourcesStateModel) {
    return state.error;
  }

  @Selector()
  static getCurrentSource(state: SourcesStateModel) {
    return state.currentSource;
  }

  @Action(Delete)
  public delete({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: Delete) {
    patchState({
      error: ''
    });
    return this.sourcesService.delete(payload).pipe(
      map(source => {
        return dispatch(new DeleteSuccess(payload));
      }),
      catchError(error => {
        return dispatch(new DeleteFail(error));
      })
    );
  }

  @Action(DeleteFail)
  public deleteFail({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: DeleteFail) {
    const state = getState();
    patchState({
      currentSource: null,
      error: payload
    });
  }

  @Action(DeleteSuccess)
  public deleteSuccess({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: DeleteSuccess) {
    const state = getState();
    patchState({
      currentSource: null,
      sources: state.sources.filter(source => source.id !== payload)
    });
  }

  @Action(Get)
  public get({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: Get) {
    patchState({
      error: ''
    });
    return this.sourcesService.get(payload).pipe(
      map((source: Source) => {
        return dispatch(new GetSuccess(source));
      }),
      catchError(err => {
        return dispatch(new GetFail(err));
      })
    );
  }

  @Action(GetFail)
  public getFail({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: GetFail) {
    const state = getState();
    patchState({
      currentSource: null,
      error: payload
    });
  }

  @Action(GetSuccess)
  public getSuccess({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: GetSuccess) {
    const state = getState();
    patchState({
      currentSource: payload,
      error: ''
    });
  }

  @Action(Load)
  public load({ dispatch, patchState }: StateContext<SourcesStateModel>) {
    patchState({
      error: ''
    });
    return this.sourcesService.load().pipe(
      map((sources: any[]) => {
        return dispatch(new LoadSuccess(sources));
      }),
      catchError(err => {
        return dispatch(new LoadFail(err));
      })
    );
  }

  @Action(LoadFail)
  public loadFail({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: LoadFail) {
    const state = getState();
    patchState({
      sources: [],
      error: payload
    });
  }

  @Action(LoadSuccess)
  public loadSuccess({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: LoadSuccess) {
    const state = getState();
    patchState({
      sources: payload,
      error: ''
    });
  }

  @Action(NewSource)
  public newSource({ patchState }: StateContext<SourcesStateModel>) {
    const initSource = {
      id: null,
      name: ''
    };
    patchState({
      currentSource: initSource
    });
  }

  @Action(Save)
  public save({ dispatch, getState, patchState }: StateContext<SourcesStateModel>) { // , { payload }: Save) {
    const state = getState();
    patchState({
      error: ''
    });
    return this.sourcesService.save(state.currentSource).pipe(
      map((source: Source) => {
        return dispatch([
          new Load(),
          new SaveSuccess(state.currentSource)
        ]);
      }),
      catchError(err => {
        return dispatch(new SaveFail(err));
      })
    );
  }

  @Action(SaveFail)
  public saveFail({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: SaveFail) {
    const state = getState();
    patchState({
      error: payload
    });
  }

  @Action(SaveSuccess)
  public saveSuccess({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: SaveSuccess) {
    const state = getState();
    const updatedSources = state.sources.map(
      item => payload.id === item.id ? payload : item);
    patchState({
      sources: updatedSources,
      currentSource: null,
      error: ''
    });
  }

}
