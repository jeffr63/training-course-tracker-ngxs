import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

import {
  DeleteSource, DeleteSourceFail, DeleteSourceSuccess,
  GetSource, GetSourceFail, GetSourceSuccess,
  LoadSources, LoadSourcesFail, LoadSourcesSuccess, NewSource,
  SaveSource, SaveSourceFail, SaveSourceSuccess
} from './sources.actions';
import { Source } from '../shared/sources';
import { SourcesService } from '../services/sources.service';

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

  @Action(DeleteSource)
  public delete({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: DeleteSource) {
    patchState({
      error: ''
    });
    return this.sourcesService.deleteSource(payload).pipe(
      map(source => {
        return dispatch(new DeleteSourceSuccess(payload));
      }),
      catchError(error => {
        return dispatch(new DeleteSourceFail(error));
      })
    );
  }

  @Action(DeleteSourceFail)
  public deleteFail({ patchState }: StateContext<SourcesStateModel>, { payload }: DeleteSourceFail) {
    patchState({
      currentSource: null,
      error: payload
    });
  }

  @Action(DeleteSourceSuccess)
  public deleteSuccess({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: DeleteSourceSuccess) {
    const state = getState();
    patchState({
      currentSource: null,
      sources: state.sources.filter(source => source.id !== payload)
    });
  }

  @Action(GetSource)
  public get({ dispatch, patchState }: StateContext<SourcesStateModel>, { payload }: GetSource) {
    patchState({
      error: ''
    });
    return this.sourcesService.getSource(payload).pipe(
      map((source: Source) => {
        return dispatch(new GetSourceSuccess(source));
      }),
      catchError(err => {
        return dispatch(new GetSourceFail(err));
      })
    );
  }

  @Action(GetSourceFail)
  public getFail({ patchState }: StateContext<SourcesStateModel>, { payload }: GetSourceFail) {
    patchState({
      currentSource: null,
      error: payload
    });
  }

  @Action(GetSourceSuccess)
  public getSuccess({ patchState }: StateContext<SourcesStateModel>, { payload }: GetSourceSuccess) {
    patchState({
      currentSource: payload,
      error: ''
    });
  }

  @Action(LoadSources)
  public load({ dispatch, patchState }: StateContext<SourcesStateModel>) {
    patchState({
      error: ''
    });
    return this.sourcesService.loadSources().pipe(
      map((sources: any[]) => {
        return dispatch(new LoadSourcesSuccess(sources));
      }),
      catchError(err => {
        return dispatch(new LoadSourcesFail(err));
      })
    );
  }

  @Action(LoadSourcesFail)
  public loadFail({ patchState }: StateContext<SourcesStateModel>, { payload }: LoadSourcesFail) {
    patchState({
      sources: [],
      error: payload
    });
  }

  @Action(LoadSourcesSuccess)
  public loadSuccess({ patchState }: StateContext<SourcesStateModel>, { payload }: LoadSourcesSuccess) {
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

  @Action(SaveSource)
  public save({ dispatch, getState, patchState }: StateContext<SourcesStateModel>) { // , { payload }: Save) {
    const state = getState();
    patchState({
      error: ''
    });
    return this.sourcesService.saveSource(state.currentSource).pipe(
      map((source: Source) => {
        return dispatch([
          new LoadSources(),
          new SaveSourceSuccess(state.currentSource)
        ]);
      }),
      catchError(err => {
        return dispatch(new SaveSourceFail(err));
      })
    );
  }

  @Action(SaveSourceFail)
  public saveFail({ patchState }: StateContext<SourcesStateModel>, { payload }: SaveSourceFail) {
    patchState({
      error: payload
    });
  }

  @Action(SaveSourceSuccess)
  public saveSuccess({ getState, patchState }: StateContext<SourcesStateModel>, { payload }: SaveSourceSuccess) {
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
