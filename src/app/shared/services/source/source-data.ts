import { Injectable, inject } from '@angular/core';

import { Source } from '@models/sources-interface';
import { DataService } from '@services/common/data-service';

@Injectable({
  providedIn: 'root',
})
export class SourceData {
  readonly #dataService = inject(DataService);

  private baseUrl = 'http://localhost:3000/sources';

  private addSource(source: Source) {
    return this.#dataService.add<Source>(source, this.baseUrl);
  }

  public deleteSource(id) {
    return this.#dataService.delete<Source>(id, this.baseUrl);
  }

  public getSource(id) {
    return this.#dataService.getById<Source>(id, this.baseUrl);
  }

  public loadSources() {
    return this.#dataService.getAll<Source[]>(`${this.baseUrl}?_sort=name&_order=asc`);
  }

  public saveSource(source: Source) {
    if (source.id) {
      return this.updateSource(source);
    } else {
      return this.addSource(source);
    }
  }

  private updateSource(source: Source) {
    return this.#dataService.update<Source>(source.id, source, this.baseUrl);
  }
}
