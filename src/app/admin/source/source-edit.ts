import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { of } from 'rxjs';

import { Source, SOURCE_EDIT_SCHEMA } from '@models/sources-interface';
import { SourceStore } from '@services/source/source-store';
import { SourceEditCard } from './source-edit-card';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-source-edit',
  imports: [SourceEditCard],
  providers: [SourceStore],
  template: ` <app-source-edit-card [form]="form" (cancel)="cancel()" (save)="save()" /> `,
})
export default class SourceEdit {
  readonly #store = inject(SourceStore);

  readonly id = input.required<string>();

  readonly #source = rxResource<Source, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      if (id === 'new') return of({ name: '' });

      this.#store.loadSource(id);
      return this.#store.source$;
    },
  });

  form = form(this.#source.value, SOURCE_EDIT_SCHEMA);

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    this.#store.save(this.#source.value());
  }
}
