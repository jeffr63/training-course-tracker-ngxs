import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';

import { DeleteComponent } from '@shared/modals/delete.component';
import { ModalDataService } from '@shared/modals/modal-data.service';
import { Path } from '@shared/models/paths';
import { PathActions } from '@state/paths/path.actions';
import { PathState } from '@state/paths/path.state';

@Injectable()
export class PathsStore {
  readonly #modal = inject(NgbModal);
  readonly #router = inject(Router);
  readonly #location = inject(Location);
  readonly #modalDataService = inject(ModalDataService);

  public readonly path$ = inject(Store).select(PathState.getCurrentPath);
  public readonly paths$ = inject(Store).select(PathState.getPaths);

  @Dispatch() public deletePath = (id: number) => new PathActions.DeletePath(id);
  @Dispatch() public loadPath = (id) => (id === 'new' ? new PathActions.NewPath() : new PathActions.GetPath(id));
  @Dispatch() public loadPaths = () => new PathActions.LoadPaths();
  @Dispatch() public savePath = (path: Path) => new PathActions.SavePath(path);

  public cancel() {
    this.#location.back();
  }

  public delete(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((_result) => {
      this.deletePath(id);
    });
  }

  public edit(id: number) {
    this.#router.navigate(['/admin/paths', id]);
  }

  public new() {
    this.#router.navigate(['/admin/paths/new']);
  }

  public save = (path: Path) => {
    this.savePath(path);
    this.#location.back();
  };
}
