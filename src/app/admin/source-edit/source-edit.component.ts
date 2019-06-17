import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Source } from '../../shared/sources';
import { SourceFacadeService } from '../source-facade.service';

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit {
  source$: Observable<Source> = this.facade.source$;
  faSave = faSave;
  faBan = faBan;

  constructor(
    private route: ActivatedRoute,
    public facade: SourceFacadeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.facade.loadSource(params.id);
    });
  }
}

