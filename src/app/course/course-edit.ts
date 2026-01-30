import { Component, inject, input, OnInit } from '@angular/core';
import { form } from '@angular/forms/signals';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { of } from 'rxjs';

import { Course, COURSE_EDIT_SCHEMA } from '@models/course-interface';
import { CourseStore } from '@services/course/course-store';
import { CourseEditCard } from './course-edit-card';

@Component({
  selector: 'app-course-edit',
  imports: [CourseEditCard],
  providers: [CourseStore],
  template: `
    <app-course-edit-card [form]="form" [paths]="paths()" [sources]="sources()" (cancel)="cancel()" (save)="save()" />
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
export default class CourseEdit {
  readonly #store = inject(CourseStore);

  readonly id = input.required<string>();
  paths = toSignal(this.#store.paths$, { requireSync: true });
  sources = toSignal(this.#store.sources$, { requireSync: true });
  readonly #course = rxResource<Course, string>({
    params: () => this.id(),
    stream: ({ params: id }) => {
      if (id === 'new') return of({ title: '', instructor: '', path: '', source: '' });

      this.#store.loadCourse(this.id());
      return this.#store.course$;
    },
  });

  readonly form = form(this.#course.value, COURSE_EDIT_SCHEMA);

  protected cancel() {
    this.#store.cancel();
  }

  protected save() {
    this.#store.save(this.id(), this.#course.value());
  }
}
