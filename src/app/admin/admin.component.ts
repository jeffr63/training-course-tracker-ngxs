import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserStore } from '@services/user/user-store.service';

@Component({
  selector: 'app-admin',
  imports: [NgbModule, RouterLink],
  providers: [UserStore],
  template: `
    <section>
      <div class="p-2 m-3 mb-4 border bg-light rounded-3">
        <div class="container-fluid py-3">
          <h1 class="display-4">Administration</h1>
        </div>
      </div>

      <div class="row m-1">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-header">Paths</div>
            <div class="card-body">
              <p class="card-text">Pre-selections for the Paths field on Course edit form.</p>
              <a [routerLink]="['/admin/paths']" class="btn btn-primary">Edit Paths</a>
            </div>
          </div>
        </div>

        <div class="col-sm-3">
          <div class="card ">
            <div class="card-header">Sources</div>
            <div class="card-body">
              <p class="card-text">Pre-selections for the Sources field on Course edit form.</p>
              <a [routerLink]="['/admin/sources']" class="btn btn-primary">Edit Sources</a>
            </div>
          </div>
        </div>

        <div class="col-sm-3">
          <div class="card ">
            <div class="card-header">Users</div>
            <div class="card-body">
              <p class="card-text">Current users edit form.</p>
              <a [routerLink]="['/admin/users']" class="btn btn-primary">Edit Users</a>
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
export default class AdminComponent {}
