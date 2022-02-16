import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// third party modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

// custom components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataServiceModule } from './services/data-service.module';
import { DeleteComponent } from './modals/delete.component';
import { CoursesState } from './state/course/course.state';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './modals/login.component';
import { MenuComponent } from './menu/menu.component';
import { PathsState } from './state/paths/paths.state';
import { SharedModule } from './shared/shared.module';
import { SourcesState } from './state/sources/sources.state';
import { UsersState } from './state/users/users.state';

@NgModule({
  declarations: [AppComponent, DashboardComponent, DeleteComponent, LoginComponent, MenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataServiceModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    NgxChartsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([CoursesState, SourcesState, PathsState, UsersState], {
      selectorOptions: { suppressErrors: false, injectContainerState: false },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
