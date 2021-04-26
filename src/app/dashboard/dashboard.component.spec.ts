import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardFacade } from './dashboard.facade';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockFacadeService;

  @Component({
    selector: 'ngx-charts-pie-chart',
    template: '<div></div>'
  })
  class FakePieChartComponent {
    @Input() view;
    @Input() results;
    @Input() labels;
    @Input() doughnut;
    @Input() arcWidth;
  }

  beforeEach(waitForAsync(() => {

    mockFacadeService = jasmine.createSpyObj(['loadChartData']);

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        FakePieChartComponent
      ],
      providers: [
        { provide: DashboardFacade, useValue: mockFacadeService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
