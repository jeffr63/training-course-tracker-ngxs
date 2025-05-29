import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CourseStore } from '@services/course/course-store';
import { DashboardStore } from '@services/dashboard/dashboard-store';
import { SourceStore } from '@services/source/source-store';
import { DashboardCard } from './dashboard-card';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard],
  providers: [CourseStore, SourceStore],
  template: ` <app-dashboard-card [courses]="courses()" [sources]="sources()" /> `,
})
export class Dashboard implements OnInit {
  protected readonly dashboardStore = inject(DashboardStore);

  protected readonly courses = toSignal(this.dashboardStore.courses$, { initialValue: [] });
  protected readonly sources = toSignal(this.dashboardStore.sources$, { initialValue: [] });

  ngOnInit() {
    this.dashboardStore.loadChartData();
  }
}
