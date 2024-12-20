import { Component, OnInit, inject, input, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Path } from '@models/paths';
import { PathsFacade } from '@facades/paths.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-path-edit',
    imports: [NgbModule, ReactiveFormsModule],
    providers: [PathsFacade],
    template: `
    <section class="container">
      <section class="card">
        @if (pathEditForm) {
        <form [formGroup]="pathEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Path Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter path name" />
              @if (pathEditForm.controls.name.errors?.required && pathEditForm.controls.name.touched) {
              <small class="text-danger">Path Name is required</small>
              }
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary me-sm-2" (click)="save()" title="Save" [disabled]="!pathEditForm.valid"><i class="bi bi-save"></i> Save</button>
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
    ]
})
export default class PathEditComponent implements OnInit {
  protected readonly facade = inject(PathsFacade);
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

    this.facade.loadPath(this.id());
    this.facade.path$.pipe(takeUntilDestroyed(this.#ref)).subscribe((path) => {
      if (!path) return;
      this.#path = { ...path };
      this.pathEditForm.get('name').setValue(this.#path.name);
    });
  }

  protected save() {
    this.#path.name = this.pathEditForm.controls.name.value;
    this.facade.save(this.#path);
  }
}
