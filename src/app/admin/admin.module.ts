import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminComponent } from './admin/admin.component';
import { CanActivateAdmin } from '../auth/canActiveateAdmin.guard';
import { PathEditComponent } from './path-edit/path-edit.component';
import { PathFacadeService } from './path-facade.service';
import { PathListComponent } from './path-list/path-list.component';
import { SharedModule } from '../shared/shared.module';
import { SourceEditComponent } from './source-edit/source-edit.component';
import { SourceFacadeService } from './source-facade.service';
import { SourceListComponent } from './source-list/source-list.component';

const routes = [
  {
    path: '', children: [
      { path: '', component: AdminComponent },
      { path: 'sources', component: SourceListComponent },
      { path: 'sources/:id', component: SourceEditComponent },
      { path: 'paths', component: PathListComponent },
      { path: 'paths/:id', component: PathEditComponent },
    ],
    canActivate: [CanActivateAdmin]
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    PathListComponent,
    PathEditComponent,
    SourceListComponent,
    SourceEditComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PathFacadeService,
    SourceFacadeService
  ]
})
export class AdminModule { }
