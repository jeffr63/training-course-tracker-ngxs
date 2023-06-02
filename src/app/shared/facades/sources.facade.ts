import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { Source } from '../models/sources';
import { SourcesActions } from '../../state/sources/sources.actions';
import { SourcesState } from '../../state/sources/sources.state';

@Injectable()
export class SourcesFacade {
  router = inject(Router);
  modal = inject(NgbModal);
  location = inject(Location);
  modalDataService = inject(ModalDataService);

  public columns = ['name'];
  public headers = ['Source'];
  public isAuthenticated = true;

  @Select(SourcesState.getCurrentSource) public source$: Observable<Source>;
  @Select(SourcesState.getSources) public sources$: Observable<Source[]>;

  @Dispatch() deleteSource = (id: number) => new SourcesActions.DeleteSource(id);
  @Dispatch() loadSource = (id) => (id === 'new' ? new SourcesActions.NewSource() : new SourcesActions.GetSource(id));
  @Dispatch() loadSources = () => new SourcesActions.LoadSources();
  @Dispatch() saveSource = (source: Source) => new SourcesActions.SaveSource(source);

  public cancel() {
    this.location.back();
  }

  public delete(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this source?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.deleteSource(id);
    });
  }

  public edit(id: number) {
    this.router.navigate(['/admin/sources', id]);
  }

  public new() {
    this.router.navigate(['/admin/sources/new']);
  }

  public save(source: Source) {
    this.saveSource(source);
    this.location.back();
  }
}
