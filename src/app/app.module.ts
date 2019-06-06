import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

// custom components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CallbackComponent } from './callback.component';
import { CoursesState } from './state/course.state';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { PathsState } from './state/paths.state';
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
    FontAwesomeModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxsModule.forRoot([CoursesState, SourcesState, PathsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
