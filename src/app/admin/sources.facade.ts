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
  @Select(SourcesState.getCurrentSource) public source$: Observable<Source>;
  @Select(SourcesState.getSources) public sources$: Observable<Source[]>;
  public closedResult = '';
  public columns = ['name'];
  public headers = ['Source'];
  public isAuthenticated = true;

  constructor(
    private store: Store,
    private router: Router,
    private modal: NgbModal,
    private location: Location
  ) { }

  public cancelEdit() {
    this.location.back();
  }

  public deleteSource(id: number, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new DeleteSource(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  public editSource(id: number) {
    this.router.navigate(['/admin/sources', id]);
  }

  public loadSource(id) {
    if (id === 'new') {
      this.store.dispatch(new NewSource());
    } else {
      this.store.dispatch(new GetSource(id));
    }
  }

  public loadSources() {
    this.store.dispatch(new LoadSources());
  }

  public newSource() {
    this.router.navigate(['/admin/sources/new']);
  }

  public saveSource() {
    this.store.dispatch(new SaveSource());
    this.location.back();
  }
}
