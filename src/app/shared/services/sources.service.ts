import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { Source } from '@models/sources';

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  private addSource(source: Source) {
    return this.http.post(`${this.baseUrl}/sources`, source);
  }

  public deleteSource(id) {
    return this.http.delete<Source>(`${this.baseUrl}/sources/${id}`);
  }

  public getSource(id) {
    return this.http.get<Source>(`${this.baseUrl}/sources/${id}`);
  }

  public loadSources() {
    return this.http.get<Source[]>(`${this.baseUrl}/sources?_sort=name&_order=asc`);
  }

  public saveSource(source: Source) {
    if (source.id) {
      return this.updateSource(source);
    } else {
      return this.addSource(source);
    }
  }

  private updateSource(source: Source) {
    return this.http.put(`${this.baseUrl}/sources/${source.id}`, source);
  }
}
