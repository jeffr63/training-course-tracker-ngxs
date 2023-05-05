import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { map, Observable } from 'rxjs';

import { DataServiceFacade } from '../data-service-facade';

@Injectable({
  providedIn: 'root',
})
export class CourseTitleResolverService {
  dataService = inject(DataServiceFacade);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Course';
    } else {
      return this.dataService.getCourse(id).pipe(map((course) => course.title));
    }
  }
}
