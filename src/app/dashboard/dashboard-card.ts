import { Component, input } from '@angular/core';
import { CourseChartData } from '@models/course-interface';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-card',
  imports: [NgbModule, NgxChartsModule],
  template: `
    <section>
      <div class="container-fluid">
        <div class="row first-row">
          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Paths</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="courses()"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5">
              </ngx-charts-pie-chart>
            </div>
          </div>

          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Sources</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="sources()"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5">
              </ngx-charts-pie-chart>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .container-fluid {
      margin-right: 10px;
      margin-left: 10px;
      margin-top: 20px;
    }
  `,
})
export class DashboardCard {
  courses = input.required<CourseChartData[]>();
  sources = input.required<CourseChartData[]>();
}
