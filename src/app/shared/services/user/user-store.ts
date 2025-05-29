import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';

import { DeleteModal } from '@modals/delete-modal';
import { ModalService } from '@modals/modal-service';
import { UserActions } from '@state/users/user.actions';
import { UserState } from '@state/users/user.state';

@Injectable()
export class UserStore {
  readonly #router = inject(Router);
  readonly #modal = inject(NgbModal);
  readonly #location = inject(Location);
  readonly #modalDataService = inject(ModalService);

  public readonly user$ = inject(Store).select(UserState.getCurrentUser);
  public readonly users$ = inject(Store).select(UserState.getUsers);

  @Dispatch() public deleteUser = (id: number) => new UserActions.DeleteUser(id);
  @Dispatch() public loadUser = (id) => new UserActions.GetUser(id);
  @Dispatch() public loadUsers = () => new UserActions.LoadUsers();
  @Dispatch() public patchUser = (id: number, payload: any) => new UserActions.PatchUser(id, payload);

  public cancel() {
    this.#location.back();
  }

  public delete(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this user?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteModal).result.then((_result) => {
      this.deleteUser(id);
    });
  }

  public edit(id: number) {
    this.#router.navigate(['/admin/users', id]);
  }

  public patch(id: number, payload: any) {
    this.patchUser(id, payload);
    this.#location.back();
  }
}
