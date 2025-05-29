import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserStore } from '@services/user/user-store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserEditCard } from './user-edit-card';

@Component({
  selector: 'app-user-edit',
  imports: [UserEditCard],
  providers: [UserStore],
  template: ` <app-user-edit-card [(userEditForm)]="userEditForm" (cancel)="cancel()" (save)="save()" /> `,
})
export default class UserEdit implements OnInit {
  readonly #store = inject(UserStore);
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

    this.#store.loadUser(this.id());
    this.#store.user$.pipe(takeUntilDestroyed(this.#ref)).subscribe((user) => {
      if (!user) return;
      this.userEditForm.get('name').setValue(user.name);
      this.userEditForm.get('email').setValue(user.email);
      this.userEditForm.get('role').setValue(user.role);
    });
  }

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    const patch = {
      name: this.userEditForm.controls.name.value,
      email: this.userEditForm.controls.email.value,
      role: this.userEditForm.controls.role.value,
    };
    this.#store.patch(+this.id(), patch);
  }
}
