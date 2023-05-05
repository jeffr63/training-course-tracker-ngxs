import { ActivatedRouteSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { DataServiceFacade } from '../data-service-facade';

@Injectable({
  providedIn: 'root',
})
export class UserTitleResolverService {
  dataService = inject(DataServiceFacade);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New User';
    } else {
      return this.dataService.getUser(id).pipe(map((user) => user.name));
    }
  }
}
