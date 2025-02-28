import { Injectable, inject } from '@angular/core';

import { Path } from '@models/paths';
import { DataService } from '@services/common/data.service';

@Injectable({
  providedIn: 'root',
})
export class PathDataService {
  readonly #dataService = inject(DataService);

  readonly #baseUrl = 'http://localhost:3000/paths';

  private addPath(path: Path) {
    return this.#dataService.add<Path>(path, this.#baseUrl);
  }

  public deletePath(id) {
    return this.#dataService.delete<Path>(id, this.#baseUrl);
  }

  public getPath(id) {
    return this.#dataService.getById<Path>(id, this.#baseUrl);
  }

  public loadPaths() {
    return this.#dataService.getAll<Path[]>(`${this.#baseUrl}?_sort=name&_order=asc`);
  }

  public savePath(path: Path) {
    if (path.id) {
      return this.updatePath(path);
    } else {
      return this.addPath(path);
    }
  }

  private updatePath(path: Path) {
    return this.#dataService.update<Path>(path.id, path, this.#baseUrl);
  }
}
