import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { DeletePath, LoadPaths, NewPath, GetPath, SavePath } from '../state/paths.actions';
import { Path } from '../shared/paths';
import { PathsState } from '../state/paths.state';

@Injectable()
export class PathsFacade {
  @Select(PathsState.getCurrentPath) public path$: Observable<Path>;
  @Select(PathsState.getPaths) public paths$: Observable<Path[]>;
  public closedResult = '';


  constructor(
    private store: Store,
    private modal: NgbModal,
    private router: Router,
    private location: Location
  ) { }

  public cancelEdit() {
    this.location.back();
  }

  public deletePath(id: number, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new DeletePath(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  public editPath(id: number) {
    this.router.navigate(['/admin/paths', id]);
  }

  public loadPath(id) {
    if (id === 'new') {
      this.store.dispatch(new NewPath());
    } else {
      this.store.dispatch(new GetPath(id));
    }
  }

  public loadPaths() {
    this.store.dispatch(new LoadPaths());
  }

  public newPath() {
    this.router.navigate(['/admin/paths/new']);
  }

  public save() {
    this.store.dispatch(new SavePath());
    this.location.back();
  }
}
