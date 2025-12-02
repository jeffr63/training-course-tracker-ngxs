import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { APP_ROUTES } from './app.routes';
import { CourseState } from '@state/course/course.state';
import { CustomTitleStrategyService } from '@services/common/custom-title-strategy';
import { PathState } from '@state/paths/path.state';
import { SourceState } from '@state/sources/source.state';
import { UserState } from '@state/users/user.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      NgxsModule.forRoot([CourseState, SourceState, PathState, UserState], {
        selectorOptions: { suppressErrors: false, injectContainerState: false },
      }),
      NgxsDispatchPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot()
    ),
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
    provideAnimations(),
    provideHttpClient(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
  ],
};
