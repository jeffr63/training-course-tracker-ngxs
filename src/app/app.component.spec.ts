import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthService } from '@services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppComponent', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AppComponent, DashboardComponent, MenuComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [NgbModule, RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
