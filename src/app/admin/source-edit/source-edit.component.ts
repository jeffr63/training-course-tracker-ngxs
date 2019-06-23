import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { SourcesFacade } from '../sources.facade';

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit {
  faSave = faSave;
  faBan = faBan;

  constructor(
    private route: ActivatedRoute,
    public facade: SourcesFacade
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.facade.loadSource(params.id);
    });
  }
}

