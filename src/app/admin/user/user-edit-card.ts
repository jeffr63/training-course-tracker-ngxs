import { Component, model, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit-card',
  imports: [NgbModule, ReactiveFormsModule],
  template: `
    <section class="container">
      <section class="card">
        @if (userEditForm()) {
        <form [formGroup]="userEditForm()">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter user's name" />
              @if (userEditForm().controls.name.errors?.required && userEditForm().controls.name.touched) {
              <small class="text-danger">Name is required</small>
              }
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="email">Email</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="email" placeholder="Enter email address" />
              @if (userEditForm().controls.email.errors?.required && userEditForm().controls.email.touched) {
              <small class="text-danger">Email is required</small>
              } @if (userEditForm().controls.email.errors?.email) {
              <small class="text-danger">Must be a valid email</small>
              }
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="email">Roles</label>
            <div class="form-check col-sm-3" style="margin-left:20px">
              <input type="radio" class="form-check-input" id="role1" value="admin" formControlName="role" />
              <label class="form-check-label" for="check1">Admin</label>
              @if (userEditForm().controls.role.errors?.required && userEditForm().controls.role.touched) {
              <small class="text-danger">Role is required</small>
              }
            </div>
            <div class="form-check col-sm-3">
              <input type="radio" class="form-check-input" value="user" id="role2" formControlName="role" />
              <label class="form-check-label" for="check1">User</label>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button
              class="btn btn-primary me-sm-2"
              (click)="save.emit()"
              title="Save"
              [disabled]="!userEditForm().valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" (click)="cancel.emit()" title="Cancel">
              <i class="bi bi-x-circle"></i> Cancel
            </a>
          </div>
        </form>
        }
      </section>
    </section>
  `,
  styles: `
      section .card {
        margin-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
      }

      .form-buttons {
        margin-left: 3px;
      }
    `,
})
export class UserEditCard {
  userEditForm = model.required<FormGroup>();
  cancel = output();
  save = output();
}
