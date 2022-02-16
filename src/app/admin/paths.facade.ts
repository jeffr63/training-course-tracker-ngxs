import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { DeleteComponent } from './../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { Path } from '../shared/paths';
import { PathsActions } from '../state/paths/paths.actions';
import { PathsState } from '../state/paths/paths.state';

@Injectable()
export class PathsFacade {
  @Select(PathsState.getCurrentPath) public path$: Observable<Path>;
  @Select(PathsState.getPaths) public paths$: Observable<Path[]>;

  constructor(
    private store: Store,
    private modal: NgbModal,
    private router: Router,
    private location: Location,
    private modalDataService: ModalDataService
  ) {}

  public cancelEdit() {
    this.location.back();
  }

  public deletePath(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation can not be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.store.dispatch(new PathsActions.DeletePath(id));
    });
  }

  public editPath(id: number) {
    this.router.navigate(['/admin/paths', id]);
  }

  public loadPath(id) {
    if (id === 'new') {
      this.store.dispatch(new PathsActions.NewPath());
    } else {
      this.store.dispatch(new PathsActions.GetPath(id));
    }
  }

  public loadPaths() {
    this.store.dispatch(new PathsActions.LoadPaths());
  }

  public newPath() {
    this.router.navigate(['/admin/paths/new']);
  }

  public save(path: Path) {
    this.store.dispatch(new PathsActions.SavePath(path));
    this.location.back();
  }
}
