import { Component, model, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-source-edit-card',
  imports: [NgbModule, ReactiveFormsModule],
  template: `
    <section class="container">
      <section class="card">
        @if (sourceEditForm()) {
        <form [formGroup]="sourceEditForm()">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Source Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter source name" />
              @if (sourceEditForm().controls.name.errors?.required && sourceEditForm().controls.name.touched) {
              <small class="text-danger">Source Name is required</small>
              }
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button
              class="btn btn-primary mr-sm-2"
              (click)="save.emit()"
              title="Save"
              [disabled]="!sourceEditForm().valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" (click)="cancel.emit()" title="Cancel">
              <i class="bi bi-x-circle"></i> Cancel
            </a>
          </div>
        </form>
        }
      </section>
    </section>
  `,
  styles: `
        section .card {
        margin-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
      }

      .form-buttons {
        margin-left: 3px;
      }
    `,
})
export class SourceEditCard {
  sourceEditForm = model.required<FormGroup>();
  cancel = output();
  save = output();
}
