import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { faSave, faBan } from "@fortawesome/free-solid-svg-icons";

import { SourcesFacade } from "./sources.facade";

@Component({
  selector: "app-source-edit",

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="facade.source$ | async as source">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name"
              >Source Name</label
            >
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="name"
                [(ngModel)]="source.name"
                placeholder="Enter source name"
              />
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button
              class="btn btn-primary mr-sm-2"
              (click)="facade.saveSource()"
              title="Save"
            >
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a
              class="btn btn-secondary"
              (click)="facade.cancelEdit()"
              title="Cancel"
            >
              <fa-icon [icon]="faBan"></fa-icon> Cancel
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
export class SourceEditComponent implements OnInit {
  faSave = faSave;
  faBan = faBan;

  constructor(private route: ActivatedRoute, public facade: SourcesFacade) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.facade.loadSource(params.id);
    });
  }
}
