import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { map } from 'rxjs';

import { DataServiceFacade } from '@facades/data-service-facade';

export const userNameResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  if (id == 'new') {
    return 'New User';
  } else {
    return inject(DataServiceFacade)
      .getUser(id)
      .pipe(map((user) => user.name));
  }
};
