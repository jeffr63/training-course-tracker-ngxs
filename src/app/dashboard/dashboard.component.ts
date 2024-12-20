import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CoursesFacade } from '@facades/courses.facade';
import { DashboardFacade } from '@facades/dashboard.facade';
import { SourcesFacade } from '@facades/sources.facade';
import { DataServiceFacade } from '@facades/data-service-facade';

@Component({
    selector: 'app-dashboard',
    imports: [NgbModule, NgxChartsModule],
    providers: [DataServiceFacade, CoursesFacade, SourcesFacade],
    template: `
    <section>
      <div class="container-fluid">
        <div class="row first-row">
          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Paths</h4>
              <ngx-charts-pie-chart [view]="[400, 400]" [results]="courses()" [labels]="true" [doughnut]="true" [arcWidth]="0.5"> </ngx-charts-pie-chart>
            </div>
          </div>

          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Sources</h4>
              <ngx-charts-pie-chart [view]="[400, 400]" [results]="sources()" [labels]="true" [doughnut]="true" [arcWidth]="0.5"> </ngx-charts-pie-chart>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
    styles: [
        `
      .container-fluid {
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 20px;
      }
    `,
    ]
})
export class DashboardComponent implements OnInit {
  protected readonly facade = inject(DashboardFacade);

  protected readonly courses = toSignal(this.facade.courses$, { initialValue: [] });
  protected readonly sources = toSignal(this.facade.sources$, { initialValue: [] });

  ngOnInit() {
    this.facade.loadChartData();
  }
}
