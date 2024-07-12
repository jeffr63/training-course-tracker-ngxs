import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersFacade } from '@facades/users.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [NgbModule, ReactiveFormsModule],
  providers: [UsersFacade],

  template: `
    <section class="container">
      <section class="card">
        @if (userEditForm) {
        <form [formGroup]="userEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter user's name" />
              @if (userEditForm.controls.name.errors?.required && userEditForm.controls.name.touched) {
              <small class="text-danger">Name is required</small>
              }
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="email">Email</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="email" placeholder="Enter email address" />
              @if (userEditForm.controls.email.errors?.required && userEditForm.controls.email.touched) {
              <small class="text-danger">Email is required</small>
              } @if (userEditForm.controls.email.errors?.email) {
              <small class="text-danger">Must be a valid email</small>
              }
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="email">Roles</label>
            <div class="form-check col-sm-3" style="margin-left:20px">
              <input type="radio" class="form-check-input" id="role1" value="admin" formControlName="role" />
              <label class="form-check-label" for="check1">Admin</label>
              @if (userEditForm.controls.role.errors?.required && userEditForm.controls.role.touched) {
              <small class="text-danger">Role is required</small>
              }
            </div>
            <div class="form-check col-sm-3">
              <input type="radio" class="form-check-input" value="user" id="role2" formControlName="role" />
              <label class="form-check-label" for="check1">User</label>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary me-sm-2" (click)="save()" title="Save" [disabled]="!userEditForm.valid"><i class="bi bi-save"></i> Save</button>
            <a class="btn btn-secondary" (click)="facade.cancel()" title="Cancel"> <i class="bi bi-x-circle"></i> Cancel </a>
          </div>
        </form>
        }
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
export default class UserEditComponent implements OnInit {
  protected readonly facade = inject(UsersFacade);
  readonly #fb = inject(FormBuilder);
  readonly #ref = inject(DestroyRef);

  readonly id = input.required<string>();
  protected userEditForm!: FormGroup;

  ngOnInit() {
    this.userEditForm = this.#fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    this.facade.loadUser(this.id());
    this.facade.user$.pipe(takeUntilDestroyed(this.#ref)).subscribe((user) => {
      if (!user) return;
      this.userEditForm.get('name').setValue(user.name);
      this.userEditForm.get('email').setValue(user.email);
      this.userEditForm.get('role').setValue(user.role);
    });
  }

  protected save() {
    const patch = {
      name: this.userEditForm.controls.name.value,
      email: this.userEditForm.controls.email.value,
      role: this.userEditForm.controls.role.value,
    };
    this.facade.patch(+this.id(), patch);
  }
}
