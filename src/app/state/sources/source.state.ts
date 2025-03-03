import { Injectable, inject } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import { Source } from '@models/sources';
import { SourcesActions } from './source.actions';
import { SourceDataService } from '@services/source/source-data.service';

export interface SourceStateModel {
  sources: Source[];
  currentSource: Source;
  error: string;
}

@State<SourceStateModel>({
  name: 'sources',
  defaults: {
    sources: [],
    currentSource: null,
    error: '',
  },
})
@Injectable()
export class SourceState {
  readonly #sourceDataService = inject(SourceDataService);

  @Selector([SourceState])
  static getSources(state: SourceStateModel): Source[] {
    return state.sources;
  }

  @Selector([SourceState])
  static getError(state: SourceStateModel): string {
    return state.error;
  }

  @Selector([SourceState])
  static getCurrentSource(state: SourceStateModel): Source {
    return state.currentSource;
  }

  @Action(SourcesActions.DeleteSource)
  public delete({ dispatch, patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.DeleteSource) {
    patchState({
      error: '',
    });
    return this.#sourceDataService.deleteSource(payload).pipe(
      map((source) => {
        return dispatch(new SourcesActions.DeleteSourceSuccess(payload));
      }),
      catchError((error) => {
        return dispatch(new SourcesActions.DeleteSourceFail(error));
      })
    );
  }

  @Action(SourcesActions.DeleteSourceFail)
  public deleteFail({ patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.DeleteSourceFail) {
    patchState({
      currentSource: null,
      error: payload,
    });
  }

  @Action(SourcesActions.DeleteSourceSuccess)
  public deleteSuccess(
    { getState, patchState }: StateContext<SourceStateModel>,
    { payload }: SourcesActions.DeleteSourceSuccess
  ) {
    const state = getState();
    patchState({
      currentSource: null,
      sources: state.sources.filter((source) => source.id !== payload),
    });
  }

  @Action(SourcesActions.GetSource)
  public get({ dispatch, patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.GetSource) {
    patchState({
      error: '',
    });
    return this.#sourceDataService.getSource(payload).pipe(
      map((source: Source) => {
        return dispatch(new SourcesActions.GetSourceSuccess(source));
      }),
      catchError((err) => {
        return dispatch(new SourcesActions.GetSourceFail(err));
      })
    );
  }

  @Action(SourcesActions.GetSourceFail)
  public getFail({ patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.GetSourceFail) {
    patchState({
      currentSource: null,
      error: payload,
    });
  }

  @Action(SourcesActions.GetSourceSuccess)
  public getSuccess({ patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.GetSourceSuccess) {
    patchState({
      currentSource: payload,
      error: '',
    });
  }

  @Action(SourcesActions.LoadSources)
  public load({ dispatch, patchState }: StateContext<SourceStateModel>) {
    patchState({
      error: '',
    });
    return this.#sourceDataService.loadSources().pipe(
      map((sources: any[]) => {
        return dispatch(new SourcesActions.LoadSourcesSuccess(sources));
      }),
      catchError((err) => {
        return dispatch(new SourcesActions.LoadSourcesFail(err));
      })
    );
  }

  @Action(SourcesActions.LoadSourcesFail)
  public loadFail({ patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.LoadSourcesFail) {
    patchState({
      sources: [],
      error: payload,
    });
  }

  @Action(SourcesActions.LoadSourcesSuccess)
  public loadSuccess({ patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.LoadSourcesSuccess) {
    patchState({
      sources: payload,
      error: '',
    });
  }

  @Action(SourcesActions.NewSource)
  public newSource({ patchState }: StateContext<SourceStateModel>) {
    const initSource = {
      id: null,
      name: '',
    };
    patchState({
      currentSource: initSource,
    });
  }

  @Action(SourcesActions.SaveSource)
  public save({ dispatch, patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.SaveSource) {
    patchState({
      error: '',
    });
    return this.#sourceDataService.saveSource(payload).pipe(
      map((source: Source) => {
        return dispatch([new SourcesActions.LoadSources(), new SourcesActions.SaveSourceSuccess(source)]);
      }),
      catchError((err) => {
        return dispatch(new SourcesActions.SaveSourceFail(err));
      })
    );
  }

  @Action(SourcesActions.SaveSourceFail)
  public saveFail({ patchState }: StateContext<SourceStateModel>, { payload }: SourcesActions.SaveSourceFail) {
    patchState({
      error: payload,
    });
  }

  @Action(SourcesActions.SaveSourceSuccess)
  public saveSuccess(
    { getState, patchState }: StateContext<SourceStateModel>,
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
