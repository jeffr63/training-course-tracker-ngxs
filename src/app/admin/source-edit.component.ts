import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, takeUntil } from 'rxjs';

import { Source } from '@models/sources';
import { SourcesFacade } from '@facades/sources.facade';

@Component({
  selector: 'app-source-edit',
  standalone: true,
  imports: [NgIf, NgbModule, ReactiveFormsModule],
  providers: [SourcesFacade],

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
            <button class="btn btn-primary mr-sm-2" (click)="save()" title="Save" [disabled]="!sourceEditForm.valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" (click)="facade.cancel()" title="Cancel">
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
export default class SourceEditComponent implements OnInit, OnDestroy {
  facade = inject(SourcesFacade);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  destroy$ = new ReplaySubject<void>(1);
  sourceEditForm!: FormGroup;
  source: Source;

  ngOnInit() {
    this.sourceEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params.id === 'New') return;
      this.facade.loadSource(params.id);
      this.facade.source$.pipe(takeUntil(this.destroy$)).subscribe((source) => {
        if (!source) return;
        this.source = { ...source };
        this.sourceEditForm.get('name').setValue(this.source.name);
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  save() {
    this.source.name = this.sourceEditForm.controls.name.value;
    this.facade.save(this.source);
  }
}
