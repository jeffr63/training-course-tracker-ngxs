import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { map } from 'rxjs';

import { DataServiceFacade } from '@facades/data-service-facade';

export const sourceNameResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  if (id == 'new') {
    return 'New Source';
  } else {
    return inject(DataServiceFacade)
      .getSource(id)
      .pipe(map((source) => source.name));
  }
};
