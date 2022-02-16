import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { UsersFacade } from './users.facade';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="userEditForm" [formGroup]="userEditForm">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name">Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter user's name" />
              <div *ngIf="userEditForm.controls.name.errors?.required && userEditForm.controls.name.touched">
                <small class="text-danger">Name is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="email">Email</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="email" placeholder="Enter email address" />
              <div *ngIf="userEditForm.controls.email.errors?.required && userEditForm.controls.email.touched">
                <small class="text-danger">Email is required</small>
              </div>
              <div *ngIf="userEditForm.controls.email.errors?.email">
                <small class="text-danger">Must be a valid email</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="email">Roles</label>
            <div class="form-group form-radio col-sm-3" style="margin-left:20px">
              <input type="radio" class="form-check-input" id="role1" value="admin" formControlName="role" />
              <label class="form-check-label" for="check1">Admin</label>
              <div *ngIf="userEditForm.controls.role.errors?.required && userEditForm.controls.role.touched">
                <small class="text-danger">Role is required</small>
              </div>
            </div>
            <div class="form-group form-radio col-sm-3">
              <input type="radio" class="form-check-input" value="user" id="role2" formControlName="role" />
              <label class="form-check-label" for="check1">User</label>
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button class="btn btn-primary mr-sm-2" (click)="saveUser()" title="Save" [disabled]="!userEditForm.valid">
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a class="btn btn-secondary" (click)="facade.cancelEdit()" title="Cancel">
              <fa-icon [icon]="faBan"></fa-icon> Cancel
            </a>
          </div>
        </form>
      </section>
    </section>
  `,

  styles: [
    `
      section .card {
        margin-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
      }

      .form-buttons {
        margin-left: 3px;
      }
    `,
  ],
})
export class UserEditComponent implements OnInit, OnDestroy {
  faSave = faSave;
  faBan = faBan;
  userEditForm!: FormGroup;
  private id: number = 0;
  private sub = new Subscription();

  constructor(private route: ActivatedRoute, public facade: UsersFacade, private fb: FormBuilder) {}

  ngOnInit() {
    this.userEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    this.sub.add(
      this.route.params.subscribe((params) => {
        this.facade.loadUser(params.id);
        this.sub.add(
          this.facade.user$.subscribe((user) => {
            if (!user) return;
            this.id = user.id;
            this.userEditForm.get('name').setValue(user.name);
            this.userEditForm.get('email').setValue(user.email);
            this.userEditForm.get('role').setValue(user.role);
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  saveUser() {
    const patch = {
      name: this.userEditForm.controls.name.value,
      email: this.userEditForm.controls.email.value,
      role: this.userEditForm.controls.role.value,
    };
    this.facade.patchUser(this.id, patch);
  }
}
