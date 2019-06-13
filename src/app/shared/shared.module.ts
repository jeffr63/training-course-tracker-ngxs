import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ListDisplayComponent } from './list-display/list-display.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { PagerListHeaderComponent } from './pager-list-header/pager-list-header.component';

@NgModule({
  declarations: [
    ListDisplayComponent,
    ListHeaderComponent,
    PagerListHeaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    NgxChartsModule,
  ],
  exports: [
    ListDisplayComponent,
    ListHeaderComponent,
    PagerListHeaderComponent
  ]
})
export class SharedModule { }
