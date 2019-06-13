import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';

import { LoadSources, DeleteSource } from './../../state/sources.actions';
import { SourcesState } from './../../state/sources.state';
import { Source } from '../../shared/sources';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {
  @Select(SourcesState.getSources) source$: Observable<any[]>;
  closedResult = '';
  columns = ['name'];
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ['Source'];
  isAuthenticated = true;
  selectPath = <Source>{};

  constructor(
    private store: Store,
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadSources());
  }

  deleteSource(id: number, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new DeleteSource(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

  editSource(id: number) {
    this.router.navigate(['/admin/sources', id]);
  }

  newSource() {
    this.router.navigate(['/admin/sources/new']);
  }

}
