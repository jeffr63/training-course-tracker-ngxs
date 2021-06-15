import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { faSave, faBan } from "@fortawesome/free-solid-svg-icons";

import { PathsFacade } from "./paths.facade";

@Component({
  selector: "app-path-edit",

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="facade.path$ | async as path">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name">Path Name</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="name"
                [(ngModel)]="path.name"
                placeholder="Enter path name"
              />
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button
              class="btn btn-primary mr-sm-2"
              (click)="facade.save()"
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
export class PathEditComponent implements OnInit {
  faSave = faSave;
  faBan = faBan;

  constructor(private route: ActivatedRoute, public facade: PathsFacade) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.facade.loadPath(params.id);
    });
  }
}
