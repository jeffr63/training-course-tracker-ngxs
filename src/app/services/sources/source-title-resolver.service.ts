import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { map, Observable, Subscription } from 'rxjs';

import { DataServiceFacade } from '../data-service-facade';

@Injectable({
  providedIn: 'root',
})
export class SourceTitleResolverService implements Resolve<string> {
  private sub = new Subscription();

  constructor(private dataService: DataServiceFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Source';
    } else {
      return this.dataService.getSource(id).pipe(map((source) => source.name));
    }
  }
}
