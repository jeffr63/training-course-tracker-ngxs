import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from '../../shared/paths';
import { PathsState } from './../../state/paths.state';
import { DeletePath, LoadPaths } from './../../state/paths.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-path-list',
  templateUrl: './path-list.component.html',
  styleUrls: ['./path-list.component.scss']
})
export class PathListComponent implements OnInit {
  @Select(PathsState.getPaths) paths$: Observable<Path[]>;
  closedResult = '';
  columns = ['name']
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ['Path'];
  isAuthenticated = true;
  selectPath = <Path>{};

  constructor(
    private store: Store,
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadPaths());
  }

  deletePath(id: number, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new DeletePath(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  editPath(id: number) {
    this.router.navigate(['/admin/paths', id]);
  }

  newPath() {
    this.router.navigate(['/admin/paths/new']);
  }

}
