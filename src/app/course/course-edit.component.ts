import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Course } from '@models/course';
import { CourseStore } from '@services/course/course-store.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { CourseEditCardComponent } from './course-edit-card.component';

@Component({
  selector: 'app-course-edit',
  imports: [CourseEditCardComponent],
  providers: [CourseStore],
  template: `
    <app-course-edit-card
      [(courseEditForm)]="courseEditForm"
      [paths]="paths()"
      [sources]="sources()"
      (cancel)="cancel()"
      (save)="save()" />
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
export default class CourseEditComponent implements OnInit {
  readonly #store = inject(CourseStore);
  readonly #fb = inject(FormBuilder);
  readonly #ref = inject(DestroyRef);

  readonly id = input.required<string>();
  #course: Course;
  protected courseEditForm!: FormGroup;
  paths = toSignal(this.#store.paths$);
  sources = toSignal(this.#store.sources$);

  ngOnInit(): void {
    this.courseEditForm = this.#fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    if (this.id() === 'New') return;

    this.#store.loadCourse(this.id());
    this.#store.course$.pipe(takeUntilDestroyed(this.#ref)).subscribe((course) => {
      if (!course) return;
      this.#course = { ...course };
      this.courseEditForm.get('title').setValue(course.title);
      this.courseEditForm.get('instructor').setValue(course.instructor);
      this.courseEditForm.get('path').setValue(course.path);
      this.courseEditForm.get('source').setValue(course.source);
    });
  }

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    this.#course.title = this.courseEditForm.controls.title.value;
    this.#course.instructor = this.courseEditForm.controls.instructor.value;
    this.#course.path = this.courseEditForm.controls.path.value;
    this.#course.source = this.courseEditForm.controls.source.value;
    this.#store.save(this.id(), this.#course);
  }
}
