import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesService } from './courses/courses.service';
import { DataServiceFacade } from './data-service-facade';
import { PathsService } from './paths/paths.service';
import { SourcesService } from './sources/sources.service';
import { UsersService } from './users/users.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CoursesService,
    PathsService,
    SourcesService,
    UsersService,
    DataServiceFacade,
  ]
})
export class DataServiceModule { }
