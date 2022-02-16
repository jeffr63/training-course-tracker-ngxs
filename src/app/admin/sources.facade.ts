import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, Select } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { DeleteComponent } from './../modals/delete.component';
import { ModalDataService } from './../modals/modal-data.service';
import { Source } from '../shared/sources';
import { SourcesActions } from '../state/sources/sources.actions';
import { SourcesState } from '../state/sources/sources.state';

@Injectable()
export class SourcesFacade {
  @Select(SourcesState.getCurrentSource) public source$: Observable<Source>;
  @Select(SourcesState.getSources) public sources$: Observable<Source[]>;
  public columns = ['name'];
  public headers = ['Source'];
  public isAuthenticated = true;

  constructor(
    private store: Store,
    private router: Router,
    private modal: NgbModal,
    private location: Location,
    private modalDataService: ModalDataService
  ) {}

  public cancelEdit() {
    this.location.back();
  }

  public deleteSource(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this source?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation can not be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.store.dispatch(new SourcesActions.DeleteSource(id));
    });
  }

  public editSource(id: number) {
    this.router.navigate(['/admin/sources', id]);
  }

  public loadSource(id) {
    if (id === 'new') {
      this.store.dispatch(new SourcesActions.NewSource());
    } else {
      this.store.dispatch(new SourcesActions.GetSource(id));
    }
  }

  public loadSources() {
    this.store.dispatch(new SourcesActions.LoadSources());
  }

  public newSource() {
    this.router.navigate(['/admin/sources/new']);
  }

  public saveSource(source: Source) {
    this.store.dispatch(new SourcesActions.SaveSource(source));
    this.location.back();
  }
}
