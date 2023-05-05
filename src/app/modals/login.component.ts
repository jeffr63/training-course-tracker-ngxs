import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgbModule, ReactiveFormsModule],

  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Login</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="loginForm">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            ngbAutofocus
            id="email"
            class="form-control"
            placeholder="Enter email address"
            formControlName="email"
          />
          <div *ngIf="loginForm.controls.email.errors?.required && loginForm.controls.email.touched">
            <small class="text-danger">Email is required</small>
          </div>
          <div *ngIf="loginForm.controls.email.errors?.email">
            <small class="text-danger">Must be a valid email</small>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Password</label>
          <input type="password" id="password" class="form-control" formControlName="password" />
          <div *ngIf="loginForm.controls.password.errors?.required && loginForm.controls.password.touched">
            <small class="text-danger">Password is required</small>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="login()" [disabled]="!loginForm.valid">Login</button>
      <button type="button" class="btn btn-warning" (click)="modal.dismiss()">Cancel</button>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  modal = inject(NgbActiveModal);

  loginForm!: FormGroup;
  private user = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.user.email = this.loginForm.controls.email.value;
    this.user.password = this.loginForm.controls.password.value;
    this.modal.close(this.user);
  }
}
