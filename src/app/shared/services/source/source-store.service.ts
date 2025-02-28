import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteComponent } from '@modals/delete.component';
import { ModalDataService } from '@modals/modal-data.service';
import { Source } from '@models/sources';
import { SourcesActions } from '@state/sources/source.actions';
import { SourceState } from '@state/sources/source.state';

@Injectable()
export class SourceStore {
  readonly #router = inject(Router);
  readonly #modal = inject(NgbModal);
  readonly #location = inject(Location);
  readonly #modalDataService = inject(ModalDataService);

  public readonly source$ = inject(Store).select(SourceState.getCurrentSource);
  public readonly sources$ = inject(Store).select(SourceState.getSources);

  @Dispatch() public deleteSource = (id: number) => new SourcesActions.DeleteSource(id);
  @Dispatch() public loadSource = (id) =>
    id === 'new' ? new SourcesActions.NewSource() : new SourcesActions.GetSource(id);
  @Dispatch() public loadSources = () => new SourcesActions.LoadSources();
  @Dispatch() public saveSource = (source: Source) => new SourcesActions.SaveSource(source);

  public cancel() {
    this.#location.back();
  }

  public delete(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this source?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((_result) => {
      this.deleteSource(id);
    });
  }

  public edit(id: number) {
    this.#router.navigate(['/admin/sources', id]);
  }

  public new() {
    this.#router.navigate(['/admin/sources/new']);
  }

  public save(source: Source) {
    this.saveSource(source);
    this.#location.back();
  }
}
