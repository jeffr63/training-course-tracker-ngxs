import { Component, OnInit } from '@angular/core';

import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Source } from '../../shared/sources';
import { SourcesFacade } from '../sources.facade';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {
  sources$: Observable<Source[]> = this.facade.sources$;
  columns = ['name'];
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ['Source'];
  isAuthenticated = true;

  constructor(
    public facade: SourcesFacade
  ) { }

  ngOnInit() {
    this.facade.loadSources();
  }

}
