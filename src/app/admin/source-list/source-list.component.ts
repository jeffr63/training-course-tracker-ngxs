import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import { Source } from '../../shared/sources';
import { SourcesState } from './../../state/sources.state';
import { Load, Delete } from './../../state/sources.actions';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {
  @Select(SourcesState.getSources) source$: Observable<any[]>;
  selectPath = <Source>{};
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(
    private store: Store,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.store.dispatch(new Load());
  }

  deleteSource(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new Delete(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

}
