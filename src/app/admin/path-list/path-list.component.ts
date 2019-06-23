import { Component, OnInit } from '@angular/core';

import { faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';

import { PathsFacade } from '../paths.facade';

@Component({
  selector: 'app-path-list',
  templateUrl: './path-list.component.html',
  styleUrls: ['./path-list.component.scss']
})
export class PathListComponent implements OnInit {
  columns = ['name']
  faBan = faBan;
  faTrashAlt = faTrashAlt;
  headers = ['Path'];
  isAuthenticated = true;

  constructor(
    public facade: PathsFacade
  ) { }

  ngOnInit() {
    this.facade.loadPaths();
  }

}
