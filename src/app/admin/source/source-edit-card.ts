import { Component, input, output } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Source } from '@models/sources-interface';
import { ValidationErrors } from '@components/validation-errors';

@Component({
  selector: 'app-source-edit-card',
  imports: [NgbModule, Field, ValidationErrors],
  template: `
    <section class="container">
      <section class="card">
        @if (form()) {
        <form>
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Source Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" [field]="form().name" placeholder="Enter source name" />
              @let fname = form().name(); @if (fname.invalid() && fname.touched()) {
              <app-validation-errors [errors]="fname.errors()" />
              }
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary mr-sm-2" (click)="save.emit()" title="Save" [disabled]="form()().invalid()">
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
  form = input.required<FieldTree<Source>>();
  cancel = output();
  save = output();
}
