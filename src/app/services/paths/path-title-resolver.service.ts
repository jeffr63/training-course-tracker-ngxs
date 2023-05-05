import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { DataServiceFacade } from '../data-service-facade';

@Injectable({
  providedIn: 'root',
})
export class PathTitleResolverService  {
  dataService = inject(DataServiceFacade);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Path';
    } else {
      return this.dataService.getPath(id).pipe(map((path) => path.name));
    }
  }
}
