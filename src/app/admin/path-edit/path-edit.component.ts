import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { PathsFacade } from '../paths.facade';

@Component({
  selector: 'app-path-edit',
  templateUrl: './path-edit.component.html',
  styleUrls: ['./path-edit.component.scss']
})
export class PathEditComponent implements OnInit {
  faSave = faSave;
  faBan = faBan;

  constructor(
    private route: ActivatedRoute,
    public facade: PathsFacade,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.facade.loadPath(params.id);
    });
  }
}
