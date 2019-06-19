import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

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
import { CallbackComponent } from './callback.component';
import { CoursesState } from './state/course.state';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { PathsState } from './state/paths.state';
import { SharedModule } from './shared/shared.module';
import { SourcesState } from './state/sources.state';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    DashboardComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataServiceModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxChartsModule,
    NgxsModule.forRoot([CoursesState, SourcesState, PathsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
