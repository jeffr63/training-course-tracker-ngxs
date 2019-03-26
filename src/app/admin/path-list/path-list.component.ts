import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from './../../services/paths';
import { PathsState } from './../../state/paths.state';
import { Delete, Load } from './../../state/paths.actions';

@Component({
  selector: 'app-path-list',
  templateUrl: './path-list.component.html',
  styleUrls: ['./path-list.component.scss']
})
export class PathListComponent implements OnInit {
  @Select(PathsState.getPaths) paths$: Observable<Path[]>;
  selectPath = <Path>{};
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

  deletePath(id, deleteModal) {
    this.modal.open(deleteModal).result.then(result => {
      this.closedResult = `Closed with ${result}`;
      this.store.dispatch(new Delete(id));
    }, (reason) => {
      this.closedResult = `Dismissed with ${reason}`;
    });
  }

}
