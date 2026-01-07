import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { expect, it, describe, beforeEach, vi } from 'vitest';

import { App } from './app';
import { AuthService } from '@services/auth/auth-service';

describe('AppComponent', () => {
    let authServiceSpy: MockedObject<AuthService>;

    beforeEach(async () => {
        const spy = {
            checkLogin: vi.fn().mockName('AuthService.checkLogin'),
        };
        await TestBed.configureTestingModule({
            imports: [App, RouterModule.forRoot([])],
            providers: [{ provide: AuthService, useValue: spy }],
        }).compileComponents();
        authServiceSpy = TestBed.inject(AuthService) as MockedObject<AuthService>;
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
