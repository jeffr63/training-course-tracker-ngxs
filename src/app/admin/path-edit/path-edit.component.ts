import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from '../../shared/paths';
import { PathFacadeService } from '../path-facade.service';

@Component({
  selector: 'app-path-edit',
  templateUrl: './path-edit.component.html',
  styleUrls: ['./path-edit.component.scss']
})
export class PathEditComponent implements OnInit {
  path$: Observable<Path> = this.facade.path$;
  faSave = faSave;
  faBan = faBan;

  constructor(
    public facade: PathFacadeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.facade.loadPath(params.id);
    });
  }
}
