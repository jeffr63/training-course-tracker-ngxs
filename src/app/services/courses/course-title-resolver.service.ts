import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { DataServiceFacade } from '../data-service-facade';

@Injectable({
  providedIn: 'root',
})
export class CourseTitleResolverService implements Resolve<string> {
  private sub = new Subscription();

  constructor(private dataService: DataServiceFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    if (id == 'new') {
      return 'New Course';
    } else {
      return this.dataService.getCourse(id).pipe(map((course) => course.title));
    }
  }
}
