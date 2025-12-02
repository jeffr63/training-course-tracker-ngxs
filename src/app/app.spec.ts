import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { App } from './app';
import { AuthService } from '@services/auth/auth-service';

describe('AppComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['checkLogin']);
    await TestBed.configureTestingModule({
      imports: [App, RouterModule.forRoot([])],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check the current login token', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    authServiceSpy.checkLogin;
    app.ngOnInit();
    fixture.whenStable();
    expect(authServiceSpy.checkLogin).toHaveBeenCalled();
  });
});
