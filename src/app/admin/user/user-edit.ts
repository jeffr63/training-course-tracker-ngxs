import { Component, inject, input } from '@angular/core';

import { UserStore } from '@services/user/user-store';
import { UserEditCard } from './user-edit-card';
import { rxResource } from '@angular/core/rxjs-interop';
import { User, USER_EDIT_SCHEMA } from '@models/user-interface';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-user-edit',
  imports: [UserEditCard],
  providers: [UserStore],
  template: ` <app-user-edit-card [form]="form" (cancel)="cancel()" (save)="save()" /> `,
})
export default class UserEdit {
  readonly #store = inject(UserStore);

  readonly id = input.required<string>();

  readonly #user = rxResource<User, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      this.#store.loadUser(id);
      return this.#store.user$;
    },
  });

  form = form<User>(this.#user.value, USER_EDIT_SCHEMA);

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    const patch = {
      name: this.#user.value().name,
      email: this.#user.value().email,
      role: this.#user.value().role,
    };
    this.#store.patch(+this.id(), patch);
  }
}
