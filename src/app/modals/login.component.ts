import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Login</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-group">
            <input
              ngbAutofocus
              id="email"
              class="form-control"
              placeholder="Enter email address"
              name="email"
              [(ngModel)]="user.email"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="email">Password</label>
          <div class="input-group">
            <input type="password" id="password" class="form-control" name="password" [(ngModel)]="user.password" />
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="modal.close(this.user)">Login</button>
      <button type="button" class="btn btn-warning" (click)="modal.dismiss()">Cancel</button>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  public user = {
    email: '',
    password: '',
  };

  constructor(public modal: NgbActiveModal) {}
}
