import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { APP_ROUTES } from './app.routes';
import { CustomTitleStrategyService } from './shared/resolvers/custom-title-strategy.service';
import { CoursesState } from './state/course/course.state';
import { SourcesState } from './state/sources/sources.state';
import { PathsState } from './state/paths/paths.state';
import { UsersState } from './state/users/users.state';

export const appConfig: ApplicationConfig = {
  providers: [
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
