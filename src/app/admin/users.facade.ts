import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, Select } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { User } from '../shared/user';
import { UserActions } from '../state/users/users.actions';
import { UsersState } from '../state/users/users.state';

@Injectable()
export class UsersFacade {
  @Select(UsersState.getCurrentUser) public user$: Observable<User>;
  @Select(UsersState.getUsers) public users$: Observable<User[]>;
  public columns = ['name', 'email', 'role'];
  public headers = ['Name', 'Email', 'Role'];
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

  public deleteUser(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this user?',
      body: 'All information associated to this source will be permanently deleted.',
      warning: 'This operation can not be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((_result) => {
      this.store.dispatch(new UserActions.DeleteUser(id));
    });
  }

  public editUser(id: number) {
    this.router.navigate(['/admin/users', id]);
  }

  public loadUser(id) {
    this.store.dispatch(new UserActions.GetUser(id));
  }

  public loadUsers() {
    this.store.dispatch(new UserActions.LoadUsers());
  }

  public patchUser() {
    this.store.dispatch(new UserActions.PatchUser());
    this.location.back();
  }
}
