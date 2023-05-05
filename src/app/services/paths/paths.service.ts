import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Path } from '../../models/paths';

@Injectable({
  providedIn: 'root',
})
export class PathsService {
  http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  private addPath(path: Path) {
    return this.http.post(`${this.baseUrl}/paths`, path);
  }

  deletePath(id) {
    return this.http.delete<Path>(`${this.baseUrl}/paths/${id}`);
  }

  getPath(id) {
    return this.http.get<Path>(`${this.baseUrl}/paths/${id}`);
  }

  loadPaths() {
    return this.http.get<Path[]>(`${this.baseUrl}/paths?_sort=name&_order=asc`);
  }

  savePath(path: Path) {
    if (path.id) {
      return this.updatePath(path);
    } else {
      return this.addPath(path);
    }
  }

  private updatePath(path: Path) {
    return this.http.put(`${this.baseUrl}/paths/${path.id}`, path);
  }
}
