import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';

import { DeleteComponent } from '@shared/modals/delete.component';
import { ModalDataService } from '@shared/modals/modal-data.service';
import { Path } from '@shared/models/paths';
import { PathsActions } from '@state/paths/paths.actions';
import { PathsState } from '@state/paths/paths.state';

@Injectable()
export class PathsFacade {
  private modal = inject(NgbModal);
  private router = inject(Router);
  private location = inject(Location);
  private modalDataService = inject(ModalDataService);

  @Select(PathsState.getCurrentPath) public path$: Observable<Path>;
  @Select(PathsState.getPaths) public paths$: Observable<Path[]>;

  @Dispatch() deletePath = (id: number) => new PathsActions.DeletePath(id);
  @Dispatch() loadPath = (id) => (id === 'new' ? new PathsActions.NewPath() : new PathsActions.GetPath(id));
  @Dispatch() loadPaths = () => new PathsActions.LoadPaths();
  @Dispatch() savePath = (path: Path) => new PathsActions.SavePath(path);

  public cancel() {
    this.location.back();
  }

  public delete(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.deletePath(id);
    });
  }

  public edit(id: number) {
    this.router.navigate(['/admin/paths', id]);
  }

  public new() {
    this.router.navigate(['/admin/paths/new']);
  }

  public save = (path: Path) => {
    this.savePath(path);
    this.location.back();
  };
}
