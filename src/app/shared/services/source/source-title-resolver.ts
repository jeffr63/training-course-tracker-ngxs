import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { map } from 'rxjs';

import { SourceData } from './source-data';

export const sourceNameResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  if (id == 'new') {
    return 'New Source';
  } else {
    return inject(SourceData)
      .getSource(id)
      .pipe(map((source) => source.name));
  }
};
