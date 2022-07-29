import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, TitleStrategy } from '@angular/router';

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
      BrowserAnimationsModule,
      HttpClientModule,
      NgxsModule.forRoot([CoursesState, SourcesState, PathsState, UsersState], {
        selectorOptions: { suppressErrors: false, injectContainerState: false },
      }),
      NgxsDispatchPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' })
    ),
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
  ],
}).catch((err) => console.error(err));
