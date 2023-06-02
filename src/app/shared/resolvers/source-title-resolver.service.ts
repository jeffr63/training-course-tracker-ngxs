import { ActivatedRouteSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { DataServiceFacade } from '@facades/data-service-facade';

@Injectable({
  providedIn: 'root',
})
export class SourceTitleResolverService {
  private dataService = inject(DataServiceFacade);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Source';
    } else {
      return this.dataService.getSource(id).pipe(map((source) => source.name));
    }
  }
}
