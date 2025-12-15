import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { form } from '@angular/forms/signals';

import { of } from 'rxjs';

import { Path, PATH_EDIT_SCHEMA } from '@models/paths-interface';
import { PathsStore } from '@services/path/path-store';
import { PathEditCard } from './path-edit-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-path-edit',
  imports: [PathEditCard],
  providers: [PathsStore],
  template: ` <app-path-edit-card [form]="form" (cancel)="cancel()" (save)="save()" /> `,
})
export default class PathEdit {
  readonly #store = inject(PathsStore);

  protected readonly id = input.required<string>();
  readonly #path = rxResource<Path, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      if (id === 'new') return of({ name: '' });

      this.#store.loadPath(this.id());
      return this.#store.path$;
    },
  });

  form = form(this.#path.value, PATH_EDIT_SCHEMA);

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    this.#store.save(this.#path.value());
  }
}
