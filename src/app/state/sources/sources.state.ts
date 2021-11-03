import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { DataServiceFacade } from '../../services/data-service-facade';
import { SourcesActions } from './sources.actions';
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

  @Selector([SourcesState])
  static getSources(state: SourcesStateModel): Source[] {
    return state.sources;
  }

  @Selector([SourcesState])
  static getError(state: SourcesStateModel): string {
    return state.error;
  }

  @Selector([SourcesState])
  static getCurrentSource(state: SourcesStateModel): Source {
    return state.currentSource;
  }

  @Action(SourcesActions.DeleteSource)
  public delete({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.DeleteSource) {
    patchState({
      error: '',
    });
    return this.dataFacade.deleteSource(payload).pipe(
      map((source) => {
        return dispatch(new SourcesActions.DeleteSourceSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new SourcesActions.DeleteSourceFail(error));
      })
    );
  }

  @Action(SourcesActions.DeleteSourceFail)
  public deleteFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.DeleteSourceFail) {
    patchState({
      currentSource: null,
      error: payload,
    });
  }

  @Action(SourcesActions.DeleteSourceSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<SourcesStateModel>,
    { payload }: SourcesActions.DeleteSourceSuccess
  ) {
    const state = getState();
    patchState({
      currentSource: null,
      sources: state.sources.filter((source) => source.id !== payload),
    });
  }

  @Action(SourcesActions.GetSource)
  public get({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.GetSource) {
    patchState({
      error: '',
    });
    return this.dataFacade.getSource(payload).pipe(
      map((source: Source) => {
        return dispatch(new SourcesActions.GetSourceSuccess(source));
      }),
      catchError((err) => {
        return dispatch(new SourcesActions.GetSourceFail(err));
      })
    );
  }

  @Action(SourcesActions.GetSourceFail)
  public getFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.GetSourceFail) {
    patchState({
      currentSource: null,
      error: payload,
    });
  }

  @Action(SourcesActions.GetSourceSuccess)
  public getSuccess({ patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.GetSourceSuccess) {
    patchState({
      currentSource: payload,
      error: '',
    });
  }

  @Action(SourcesActions.LoadSources)
  public load({ dispatch, patchState }: StateContext<SourcesStateModel>) {
    patchState({
      error: '',
    });
    return this.dataFacade.loadSources().pipe(
      map((sources: any[]) => {
        return dispatch(new SourcesActions.LoadSourcesSuccess(sources));
      }),
      catchError((err) => {
        return dispatch(new SourcesActions.LoadSourcesFail(err));
      })
    );
  }

  @Action(SourcesActions.LoadSourcesFail)
  public loadFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.LoadSourcesFail) {
    patchState({
      sources: [],
      error: payload,
    });
  }

  @Action(SourcesActions.LoadSourcesSuccess)
  public loadSuccess({ patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.LoadSourcesSuccess) {
    patchState({
      sources: payload,
      error: '',
    });
  }

  @Action(SourcesActions.NewSource)
  public newSource({ patchState }: StateContext<SourcesStateModel>) {
    const initSource = {
      id: null,
      name: '',
    };
    patchState({
      currentSource: initSource,
    });
  }

  @Action(SourcesActions.SaveSource)
  public save({ dispatch, getState, patchState }: StateContext<SourcesStateModel>) {
    // , { payload }: Save) {
    const state = getState();
    patchState({
      error: '',
    });
    return this.dataFacade.saveSource(state.currentSource).pipe(
      map((source: Source) => {
        return dispatch([new SourcesActions.LoadSources(), new SourcesActions.SaveSourceSuccess(state.currentSource)]);
      }),
      catchError((err) => {
        return dispatch(new SourcesActions.SaveSourceFail(err));
      })
    );
  }

  @Action(SourcesActions.SaveSourceFail)
  public saveFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SourcesActions.SaveSourceFail) {
    patchState({
      error: payload,
    });
  }

  @Action(SourcesActions.SaveSourceSuccess)
  public saveSuccess(
    { getState, patchState }: StateContext<SourcesStateModel>,
    { payload }: SourcesActions.SaveSourceSuccess
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
