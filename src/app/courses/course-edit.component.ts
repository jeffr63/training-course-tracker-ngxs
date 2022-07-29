import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Course } from '../models/course';
import { CoursesFacade } from './courses.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  providers: [CoursesFacade],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="courseEditForm" [formGroup]="courseEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="title">Title</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="title"
                placeholder="Enter title of course taken"
              />
              <div *ngIf="courseEditForm.controls.title.errors?.required && courseEditForm.controls.title.touched">
                <small class="text-danger">Title is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="instructor">Instructor</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="instructor"
                placeholder="Enter name of course's intructor"
              />
              <div
                *ngIf="
                  courseEditForm.controls.instructor.errors?.required && courseEditForm.controls.instructor.touched
                "
              >
                <small class="text-danger">Instructor is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="path">Path</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="path"
                list="path-helpers"
                placeholder="Enter technical path of course (ex: Angular or React)"
              />
              <datalist id="path-helpers">
                <option *ngFor="let path of facade.paths$ | async" value="{{ path.name }}"></option>
              </datalist>
              <div *ngIf="courseEditForm.controls.path.errors?.required && courseEditForm.controls.path.touched">
                <small class="text-danger">Path is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="source">Source</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="source"
                list="source-helpers"
                placeholder="Enter where the course was sourced from (ex: Pluralsite)"
              />
              <datalist id="source-helpers">
                <option *ngFor="let source of facade.sources$ | async" value="{{ source.name }}"></option>
              </datalist>
              <div *ngIf="courseEditForm.controls.source.errors?.required && courseEditForm.controls.source.touched">
                <small class="text-danger">Source is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button
              class="btn btn-primary me-sm-2"
              (click)="save()"
              title="Save"
              [disabled]="!courseEditForm.valid"
            >
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
export class CourseEditComponent implements OnInit, OnDestroy {
  id = '';
  courseEditForm!: FormGroup;
  private course: Course;
  private sub = new Subscription();

  constructor(private route: ActivatedRoute, public facade: CoursesFacade, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseEditForm = this.fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.sub.add(
      this.route.params.subscribe((params) => {
        this.id = params.id;
        if (params.id === 'New') return;
        this.facade.loadCourse(params.id);
        this.sub.add(
          this.facade.course$.subscribe((course) => {
            if (!course) return;
            this.course = { ...course };
            this.courseEditForm.get('title').setValue(course.title);
            this.courseEditForm.get('instructor').setValue(course.instructor);
            this.courseEditForm.get('path').setValue(course.path);
            this.courseEditForm.get('source').setValue(course.source);
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

  save() {
    this.course.title = this.courseEditForm.controls.title.value;
    this.course.instructor = this.courseEditForm.controls.instructor.value;
    this.course.path = this.courseEditForm.controls.path.value;
    this.course.source = this.courseEditForm.controls.source.value;
    this.facade.save(this.id, this.course);
  }
}
