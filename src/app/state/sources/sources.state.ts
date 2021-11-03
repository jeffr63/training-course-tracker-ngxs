import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { DataServiceFacade } from '../../services/data-service-facade';
import { SourceActions } from './sources.actions';
import { Source } from '../../shared/sources';

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
  },
})
@Injectable()
export class SourcesState {
  constructor(private dataFacade: DataServiceFacade) {}

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

  @Action(SourceActions.DeleteSource)
  public delete({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.DeleteSource) {
    patchState({
      error: '',
    });
    return this.dataFacade.deleteSource(payload).pipe(
      map((source) => {
        return dispatch(new SourceActions.DeleteSourceSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new SourceActions.DeleteSourceFail(error));
      })
    );
  }

  @Action(SourceActions.DeleteSourceFail)
  public deleteFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.DeleteSourceFail) {
    patchState({
      currentSource: null,
      error: payload,
    });
  }

  @Action(SourceActions.DeleteSourceSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<SourcesStateModel>,
    { payload }: SourceActions.DeleteSourceSuccess
  ) {
    const state = getState();
    patchState({
      currentSource: null,
      sources: state.sources.filter((source) => source.id !== payload),
    });
  }

  @Action(SourceActions.GetSource)
  public get({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.GetSource) {
    patchState({
      error: '',
    });
    return this.dataFacade.getSource(payload).pipe(
      map((source: Source) => {
        return dispatch(new SourceActions.GetSourceSuccess(source));
      }),
      catchError((err) => {
        return dispatch(new SourceActions.GetSourceFail(err));
      })
    );
  }

  @Action(SourceActions.GetSourceFail)
  public getFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.GetSourceFail) {
    patchState({
      currentSource: null,
      error: payload,
    });
  }

  @Action(SourceActions.GetSourceSuccess)
  public getSuccess({ patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.GetSourceSuccess) {
    patchState({
      currentSource: payload,
      error: '',
    });
  }

  @Action(SourceActions.LoadSources)
  public load({ dispatch, patchState }: StateContext<SourcesStateModel>) {
    patchState({
      error: '',
    });
    return this.dataFacade.loadSources().pipe(
      map((sources: any[]) => {
        return dispatch(new SourceActions.LoadSourcesSuccess(sources));
      }),
      catchError((err) => {
        return dispatch(new SourceActions.LoadSourcesFail(err));
      })
    );
  }

  @Action(SourceActions.LoadSourcesFail)
  public loadFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.LoadSourcesFail) {
    patchState({
      sources: [],
      error: payload,
    });
  }

  @Action(SourceActions.LoadSourcesSuccess)
  public loadSuccess({ patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.LoadSourcesSuccess) {
    patchState({
      sources: payload,
      error: '',
    });
  }

  @Action(SourceActions.NewSource)
  public newSource({ patchState }: StateContext<SourcesStateModel>) {
    const initSource = {
      id: null,
      name: '',
    };
    patchState({
      currentSource: initSource,
    });
  }

  @Action(SourceActions.SaveSource)
  public save({ dispatch, getState, patchState }: StateContext<SourcesStateModel>) {
    // , { payload }: Save) {
    const state = getState();
    patchState({
      error: '',
    });
    return this.dataFacade.saveSource(state.currentSource).pipe(
      map((source: Source) => {
        return dispatch([new SourceActions.LoadSources(), new SourceActions.SaveSourceSuccess(state.currentSource)]);
      }),
      catchError((err) => {
        return dispatch(new SourceActions.SaveSourceFail(err));
      })
    );
  }

  @Action(SourceActions.SaveSourceFail)
  public saveFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourceActions.SaveSourceFail) {
    patchState({
      error: payload,
    });
  }

  @Action(SourceActions.SaveSourceSuccess)
  public saveSuccess(
    { getState, patchState }: StateContext<SourcesStateModel>,
    { payload }: SourceActions.SaveSourceSuccess
  ) {
    const state = getState();
    const updatedSources = state.sources.map((item) => (payload.id === item.id ? payload : item));
    patchState({
      sources: updatedSources,
      currentSource: null,
      error: '',
    });
  }
}
