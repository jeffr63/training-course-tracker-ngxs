import { Component, OnInit, inject, DestroyRef, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Source } from '@models/sources';
import { SourceStore } from '@services/source/source-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SourceEditCardComponent } from './source-edit-card.component';

@Component({
  selector: 'app-source-edit',
  imports: [SourceEditCardComponent],
  providers: [SourceStore],
  template: ` <app-source-edit-card [(sourceEditForm)]="sourceEditForm" (cancel)="cancel()" (save)="save()" /> `,
})
export default class SourceEditComponent implements OnInit {
  readonly #store = inject(SourceStore);
  readonly #fb = inject(FormBuilder);
  readonly #ref = inject(DestroyRef);

  readonly id = input.required<string>();
  protected sourceEditForm!: FormGroup;
  #source: Source;

  ngOnInit() {
    this.sourceEditForm = this.#fb.group({
      name: ['', Validators.required],
    });

    if (this.id() === 'New') return;

    this.#store.loadSource(this.id());
    this.#store.source$.pipe(takeUntilDestroyed(this.#ref)).subscribe((source) => {
      if (!source) return;
      this.#source = { ...source };
      this.sourceEditForm.get('name').setValue(this.#source.name);
    });
  }

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    this.#source.name = this.sourceEditForm.controls.name.value;
    this.#store.save(this.#source);
  }
}
