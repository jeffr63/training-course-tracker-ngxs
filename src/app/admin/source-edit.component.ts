import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Source } from '../models/sources';

import { SourcesFacade } from './sources.facade';

@Component({
  selector: 'app-source-edit',

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="sourceEditForm" [formGroup]="sourceEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Source Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter source name" />
              <div *ngIf="sourceEditForm.controls.name.errors?.required && sourceEditForm.controls.name.touched">
                <small class="text-danger">Source Name is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button
              class="btn btn-primary mr-sm-2"
              (click)="saveSource()"
              title="Save"
              [disabled]="!sourceEditForm.valid"
            >
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" (click)="facade.cancelEdit()" title="Cancel">
              <i class="bi bi-x-circle"></i> Cancel
            </a>
          </div>
        </form>
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
  ],
})
export class SourceEditComponent implements OnInit, OnDestroy {
  sourceEditForm!: FormGroup;
  private sub = new Subscription();
  private source: Source;

  constructor(private route: ActivatedRoute, public facade: SourcesFacade, private fb: FormBuilder) {}

  ngOnInit() {
    this.sourceEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.sub.add(
      this.route.params.subscribe((params) => {
        if (params.id === 'New') return;
        this.facade.loadSource(params.id);
        this.sub.add(
          this.facade.source$.subscribe((source) => {
            if (!source) return;
            this.source = { ...source };
            this.sourceEditForm.get('name').setValue(this.source.name);
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  saveSource() {
    this.source.name = this.sourceEditForm.controls.name.value;
    this.facade.saveSource(this.source);
  }
}
