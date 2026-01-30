import { Component, input, output } from '@angular/core';
import { FormField, FieldTree, ValidationError } from '@angular/forms/signals';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Path } from '@models/paths-interface';
import { Source } from '@models/sources-interface';
import { Course } from '@models/course-interface';
import * as validate from '@services/common/validation-error';

@Component({
  selector: 'app-course-edit-card',
  imports: [NgbModule, FormField],
  template: `
    <section class="container">
      <section class="card">
        @if (form()) {
          <form>
            <fieldset class="m-2 row">
              <label class="col-form-label col-sm-2" for="title">Title</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  [formField]="form().title"
                  placeholder="Enter title of course taken" />
                @let ftitle = form().title();
                @if (ftitle.invalid() && ftitle.touched()) {
                  <div style="display:flex: flex-direction: column;">
                    @for (error of ftitle.errors(); track error.kind) {
                      <div style="flex:1;color:red">{{ getError(error) }}</div>
                    }
                  </div>
                }
              </div>
            </fieldset>

            <fieldset class="m-2 row">
              <label class="col-form-label col-sm-2" for="instructor">Instructor</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  [formField]="form().instructor"
                  placeholder="Enter name of course's intructor" />
                @let finstructor = form().instructor();
                @if (finstructor.invalid() && finstructor.touched()) {
                  <div style="display:flex: flex-direction: column;">
                    @for (error of finstructor.errors(); track error.kind) {
                      <div style="flex:1;color:red">{{ getError(error) }}</div>
                    }
                  </div>
                }
              </div>
            </fieldset>

            <fieldset class="m-2 row">
              <label class="col-form-label col-sm-2" for="path">Path</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  [formField]="form().path"
                  list="path-helpers"
                  placeholder="Enter technical path of course (ex: Angular or React)" />
                <datalist id="path-helpers">
                  @for (path of paths(); track path.id) {
                    <option value="{{ path.name }}"></option>
                  }
                </datalist>
                @let fpath = form().path();
                @if (fpath.invalid() && fpath.touched()) {
                  <div style="display:flex: flex-direction: column;">
                    @for (error of fpath.errors(); track error.kind) {
                      <div style="flex:1;color:red">{{ getError(error) }}</div>
                    }
                  </div>
                }
              </div>
            </fieldset>

            <fieldset class="m-2 row">
              <label class="col-form-label col-sm-2" for="source">Source</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  [formField]="form().source"
                  list="source-helpers"
                  placeholder="Enter where the course was sourced from (ex: Pluralsite)" />
                <datalist id="source-helpers">
                  @for (source of sources(); track source.id) {
                    <option value="{{ source.name }}"></option>
                  }
                </datalist>
                @let fsource = form().source();
                @if (fsource.invalid() && fsource.touched()) {
                  <div style="display:flex: flex-direction: column;">
                    @for (error of fsource.errors(); track error.kind) {
                      <div style="flex:1;color:red">{{ getError(error) }}</div>
                    }
                  </div>
                }
              </div>
            </fieldset>

            <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
              <button
                class="btn btn-primary me-sm-2"
                (click)="save.emit()"
                title="Save"
                [disabled]="form()().invalid()">
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
  styles: ``,
})
export class CourseEditCard {
  form = input.required<FieldTree<Course>>();
  paths = input.required<Path[]>();
  sources = input.required<Source[]>();
  cancel = output();
  save = output();

  getError(error: ValidationError) {
    return validate.getError(error);
  }
}
