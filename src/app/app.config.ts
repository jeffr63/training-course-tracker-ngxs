import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { APP_ROUTES } from './app.routes';
import { CoursesState } from '@state/course/course.state';
import { CustomTitleStrategyService } from '@resolvers/custom-title-strategy.service';
import { PathsState } from '@state/paths/paths.state';
import { SourcesState } from '@state/sources/sources.state';
import { UsersState } from '@state/users/users.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      NgxsModule.forRoot([CoursesState, SourcesState, PathsState, UsersState], {
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
