import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CourseData } from './../shared/course';
import { DashboardFacade } from './dashboard.facade'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courses$: Observable<CourseData[]> = this.facade.courses$;
  sources$: Observable<CourseData[]> = this.facade.sources$;

  constructor(
    private facade: DashboardFacade,
  ) { }

  ngOnInit() {
    this.facade.loadChartData();
  }
}
