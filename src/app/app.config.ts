import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

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
    importProvidersFrom(
      NgxsModule.forRoot([CourseState, SourceState, PathState, UserState], {
        selectorOptions: { suppressErrors: false, injectContainerState: false },
      }),
      NgxsDispatchPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot()
    ),
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
    provideZonelessChangeDetection(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
  ],
};
