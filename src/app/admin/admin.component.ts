import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",

  template: `
    <section>
      <div class="jumbotron">
        <h1 class="display-4">Administration</h1>
      </div>
      <div class="card-deck">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-header">Paths</div>
            <div class="card-body">
              <p class="card-text">
                Pre-selections for the Paths field on Course edit form.
              </p>
              <a [routerLink]="['/admin/paths']" class="btn btn-primary"
                >Edit Paths</a
              >
            </div>
          </div>
        </div>

        <div class="col-sm-3">
          <div class="card ">
            <div class="card-header">Sources</div>
            <div class="card-body">
              <p class="card-text">
                Pre-selections for the Sources field on Course edit form.
              </p>
              <a [routerLink]="['/admin/sources']" class="btn btn-primary"
                >Edit Sources</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  styles: [
    `
      .jumbotron {
        padding: 10px;
      }
    `,
  ],
})
export class AdminComponent {
  constructor(router: Router) {}
}
