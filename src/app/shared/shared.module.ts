import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListDisplayComponent } from './list-display.component';
import { ListHeaderComponent } from './list-header.component';
import { PagerListHeaderComponent } from './pager-list-header.component';

@NgModule({
  declarations: [ListDisplayComponent, ListHeaderComponent, PagerListHeaderComponent],
  imports: [CommonModule, NgbModule],
  exports: [ListDisplayComponent, ListHeaderComponent, PagerListHeaderComponent],
})
export class SharedModule {}
