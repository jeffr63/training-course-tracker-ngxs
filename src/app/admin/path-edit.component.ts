import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Path } from '../models/paths';
import { PathsFacade } from './paths.facade';

@Component({
  selector: 'app-path-edit',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule, RouterModule],
  providers: [PathsFacade],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="pathEditForm" [formGroup]="pathEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Path Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter path name" />
              <div *ngIf="pathEditForm.controls.name.errors?.required && pathEditForm.controls.name.touched">
                <small class="text-danger">Path Name is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary me-sm-2" (click)="savePath()" title="Save" [disabled]="!pathEditForm.valid">
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
export class PathEditComponent implements OnInit, OnDestroy {
  pathEditForm!: FormGroup;
  private path: Path;
  private sub = new Subscription();

  constructor(private route: ActivatedRoute, public facade: PathsFacade, private fb: FormBuilder) {}

  ngOnInit() {
    this.pathEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.sub.add(
      this.route.params.subscribe((params) => {
        if (params.id === 'New') return;
        this.facade.loadPath(params.id);
        this.sub.add(
          this.facade.path$.subscribe((path) => {
            if (!path) return;
            this.path = { ...path };
            this.pathEditForm.get('name').setValue(this.path.name);
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  savePath() {
    this.path.name = this.pathEditForm.controls.name.value;
    this.facade.save(this.path);
  }
}
