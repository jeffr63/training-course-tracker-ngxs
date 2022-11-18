import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';

import { NgxsModule } from '@ngxs/store';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { environment } from './environments/environment';
import { APP_ROUTES } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { CustomTitleStrategyService } from './app/services/custom-title-strategy.service';
import { CoursesState } from './app/state/course/course.state';
import { PathsState } from './app/state/paths/paths.state';
import { SourcesState } from './app/state/sources/sources.state';
import { UsersState } from './app/state/users/users.state';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
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
    provideRouter(APP_ROUTES),
  ],
}).catch((err) => console.error(err));
