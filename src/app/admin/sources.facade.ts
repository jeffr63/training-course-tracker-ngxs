import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, Select } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { LoadSources, DeleteSource, SaveSource, GetSource, NewSource } from '../state/sources.actions';
import { Source } from '../shared/sources';
import { SourcesState } from '../state/sources.state';

@Injectable()
export class SourcesFacade {
  @Select(SourcesState.getCurrentSource) source$: Observable<Source>;
  @Select(SourcesState.getSources) sources$: Observable<Source[]>;
  closedResult = '';
  columns = ['name'];
  headers = ['Source'];
  isAuthenticated = true;

  constructor(
    private store: Store,
    private router: Router,
    private modal: NgbModal,
    private location: Location
  ) { }

  cancelEdit() {
    this.location.back();
  }

  deleteSource(id: number, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new DeleteSource(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  editSource(id: number) {
    this.router.navigate(['/admin/sources', id]);
  }

  loadSource(id) {
    if (id === 'new') {
      this.store.dispatch(new NewSource());
    } else {
      this.store.dispatch(new GetSource(id));
    }
  }

  loadSources() {
    this.store.dispatch(new LoadSources());
  }

  newSource() {
    this.router.navigate(['/admin/sources/new']);
  }

  saveSource() {
    this.store.dispatch(new SaveSource());
    this.location.back();
  }
}
