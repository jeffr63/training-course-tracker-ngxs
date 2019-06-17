import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from '../../shared/paths';
import { PathsState } from './../../state/paths.state';
import { DeletePath, LoadPaths } from './../../state/paths.actions';
import { Router } from '@angular/router';
import { PathFacadeService } from '../path-facade.service';

@Component({
  selector: 'app-path-list',
  templateUrl: './path-list.component.html',
  styleUrls: ['./path-list.component.scss']
})
export class PathListComponent implements OnInit {
  paths$: Observable<Path[]> = this.facade.paths$;
  columns = ['name']
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ['Path'];
  isAuthenticated = true;

  constructor(
    public facade: PathFacadeService
  ) { }

  ngOnInit() {
    this.facade.loadPaths();
  }

}
