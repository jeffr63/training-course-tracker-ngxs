import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CourseStore } from '@services/course/course-store.service';
import { DashboardStore } from '@services/dashboard/dashboard-store.service';
import { SourceStore } from '@services/source/source-store.service';
import { DashboardCardComponent } from "./dashboard-card.component";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCardComponent],
  providers: [CourseStore, SourceStore],
  template: `
    <app-dashboard-card [courses]="courses()" [sources]="sources()" />
  `,
})
export class DashboardComponent implements OnInit {
  protected readonly dashboardStore = inject(DashboardStore);

  protected readonly courses = toSignal(this.dashboardStore.courses$, { initialValue: [] });
  protected readonly sources = toSignal(this.dashboardStore.sources$, { initialValue: [] });

  ngOnInit() {
    this.dashboardStore.loadChartData();
  }
}
