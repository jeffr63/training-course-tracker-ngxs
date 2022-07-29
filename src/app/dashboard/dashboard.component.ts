import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

import { CoursesFacade } from '../courses/courses.facade';
import { DashboardFacade } from './dashboard.facade';
import { SourcesFacade } from '../admin/sources/sources.facade';
import { CourseData } from '../models/course';
import { DataServiceFacade } from '../services/data-service-facade';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgbModule, NgxChartsModule],
  providers: [DataServiceFacade, CoursesFacade, SourcesFacade],

  template: `
    <section>
      <div class="container-fluid">
        <div class="row first-row">
          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Paths</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="courses$ | async"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5"
              >
              </ngx-charts-pie-chart>
            </div>
          </div>

          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Sources</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="sources$ | async"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5"
              >
              </ngx-charts-pie-chart>
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
  ],
})
export class DashboardComponent implements OnInit {
  courses$: Observable<CourseData[]> = this.facade.courses$;
  sources$: Observable<CourseData[]> = this.facade.sources$;

  constructor(private facade: DashboardFacade) {}

  ngOnInit() {
    this.facade.loadChartData();
  }
}
