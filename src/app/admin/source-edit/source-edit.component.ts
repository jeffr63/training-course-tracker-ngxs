import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Source } from '../../shared/sources';
import { SourcesState } from './../../state/sources.state';
import { Get, Save, NewSource } from './../../state/sources.actions';

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit, OnDestroy {
  @Select(SourcesState.getCurrentSource) source$: Observable<Source>;
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
        this.store.dispatch(new NewSource());
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

