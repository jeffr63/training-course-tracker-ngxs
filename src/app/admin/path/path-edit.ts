import { Component, OnInit, inject, input, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Path } from '@models/paths-interface';
import { PathsStore } from '@services/path/path-store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PathEditCard } from './path-edit-card';

@Component({
  selector: 'app-path-edit',
  imports: [PathEditCard],
  providers: [PathsStore],
  template: ` <app-path-edit-card [(pathEditForm)]="pathEditForm" (cancel)="cancel()" (save)="save()" /> `,
})
export default class PathEdit implements OnInit {
  readonly #store = inject(PathsStore);
  readonly #fb = inject(FormBuilder);
  readonly #ref = inject(DestroyRef);

  protected readonly id = input.required<string>();
  #path: Path;
  protected pathEditForm!: FormGroup;

  ngOnInit() {
    this.pathEditForm = this.#fb.group({
      name: ['', Validators.required],
    });

    if (this.id() === 'New') return;

    this.#store.loadPath(this.id());
    this.#store.path$.pipe(takeUntilDestroyed(this.#ref)).subscribe((path) => {
      if (!path) return;
      this.#path = { ...path };
      this.pathEditForm.get('name').setValue(this.#path.name);
    });
  }

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    this.#path.name = this.pathEditForm.controls.name.value;
    this.#store.save(this.#path);
  }
}
