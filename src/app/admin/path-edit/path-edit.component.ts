import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from '../../shared/paths';
import { PathsState } from './../../state/paths.state';
import { Get, Save, NewPath } from './../../state/paths.actions';

@Component({
  selector: 'app-path-edit',
  templateUrl: './path-edit.component.html',
  styleUrls: ['./path-edit.component.scss']
})
export class PathEditComponent implements OnInit, OnDestroy {
  @Select(PathsState.getCurrentPath) path$: Observable<Path>;
  componentActive = true;
  faSave = faSave;
  faBan = faBan;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id === 'new') {
        this.store.dispatch(new NewPath());
      } else {
        this.store.dispatch(new Get(params.id));
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(new Save());
    this.location.back();
  }

}
