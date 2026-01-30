import { Component, input, output } from '@angular/core';
import { FormField, FieldTree, ValidationError } from '@angular/forms/signals';
import { User } from '@models/user-interface';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as validate from '@services/common/validation-error';

@Component({
  selector: 'app-user-edit-card',
  imports: [NgbModule, FormField],
  template: `
    <section class="container">
      <section class="card">
        @if (form()) {
          <form>
            <fieldset class="m-2 row">
              <label class="col-form-label col-sm-2" for="name">Name</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" [formField]="form().name" placeholder="Enter user's name" />
                @let fname = form().name();
                @if (fname.invalid() && fname.touched()) {
                  <div style="display:flex: flex-direction: column;">
                    @for (error of fname.errors(); track error.kind) {
                      <div style="flex:1;color:red">{{ getError(error) }}</div>
                    }
                  </div>
                }
              </div>
            </fieldset>

            <fieldset class="m-2 row">
              <label class="col-form-label col-sm-2" for="email">Email</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" [formField]="form().email" placeholder="Enter email address" />
                @let femail = form().email();
                @if (femail.invalid() && femail.touched()) {
                  <div style="display:flex: flex-direction: column;">
                    @for (error of femail.errors(); track error.kind) {
                      <div style="flex:1;color:red">{{ getError(error) }}</div>
                    }
                  </div>
                }
              </div>
            </fieldset>

            <fieldset class="m-2 row">
              <label class="col-form-label col-sm-2" for="email">Roles</label>
              <div class="form-check col-sm-3" style="margin-left:20px">
                <input type="radio" class="form-check-input" id="role1" value="admin" [formField]="form().role" />
                <label class="form-check-label" for="check1">Admin</label>
              </div>
              <div class="form-check col-sm-3">
                <input type="radio" class="form-check-input" value="user" id="role2" [formField]="form().role" />
                <label class="form-check-label" for="check1">User</label>
              </div>
            </fieldset>
            @let frole = form().role();
            @if (frole.invalid() && frole.touched()) {
              <div class="m-2 mt-0 row">
                <div class="col-sm-8 offset-sm-2">
                  <div style="display:flex: flex-direction: column;">
                    @for (error of frole.errors(); track error.kind) {
                      <div style="flex:1;color:red">{{ getError(error) }}</div>
                    }
                  </div>
                </div>
              </div>
            }
            <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
              <button
                class="btn btn-primary me-sm-2"
                (click)="save.emit()"
                title="Save"
                [disabled]="form()().invalid()">
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
  form = input.required<FieldTree<User>>();
  cancel = output();
  save = output();

  getError(error: ValidationError) {
    return validate.getError(error);
  }
}
