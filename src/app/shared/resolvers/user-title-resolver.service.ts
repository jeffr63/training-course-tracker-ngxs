import { ActivatedRouteSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { DataServiceFacade } from '../facades/data-service-facade';
import { User } from '../models/user';

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
      return this.dataService.getUser(id).pipe(map((user: User) => user.name));
    }
  }
}
