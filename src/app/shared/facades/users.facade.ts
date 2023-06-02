import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { User } from '../models/user';
import { UserActions } from '../../state/users/users.actions';
import { UsersState } from '../../state/users/users.state';

@Injectable()
export class UsersFacade {
  router = inject(Router);
  modal = inject(NgbModal);
  location = inject(Location);
  modalDataService = inject(ModalDataService);

  public columns = ['name', 'email', 'role'];
  public headers = ['Name', 'Email', 'Role'];
  public isAuthenticated = true;

  @Select(UsersState.getCurrentUser) public user$: Observable<User>;
  @Select(UsersState.getUsers) public users$: Observable<User[]>;

  @Dispatch() deleteUser = (id: number) => new UserActions.DeleteUser(id);
  @Dispatch() loadUser = (id) => new UserActions.GetUser(id);
  @Dispatch() loadUsers = () => new UserActions.LoadUsers();
  @Dispatch() patchUser = (id: number, payload: any) => new UserActions.PatchUser(id, payload);

  public cancel() {
    this.location.back();
  }

  public delete(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this user?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.deleteUser(id);
    });
  }

  public edit(id: number) {
    this.router.navigate(['/admin/users', id]);
  }

  public patch(id: number, payload: any) {
    this.patchUser(id, payload);
    this.location.back();
  }
}
