import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/services/auth.service';

describe('AppComponent', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent, DashboardComponent, MenuComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
