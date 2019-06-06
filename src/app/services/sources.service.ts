import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { Source } from '../shared/sources';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  add(source: Source) {
    return this.http.post(`${this.baseUrl}/sources`, source);
  }

  delete(id) {
    return this.http.delete<Source>(`${this.baseUrl}/sources/${id}`);
  }

  get(id) {
    return this.http.get<Source>(`${this.baseUrl}/sources/${id}`);
  }

  load() {
    return this.http.get<Source[]>(`${this.baseUrl}/sources?_sort=name&_order=asc`);
  }

  save(source: Source) {
    if (source.id) {
      return this.update(source);
    } else {
      return this.add(source);
    }
  }

  update(source: Source) {
    return this.http.put(`${this.baseUrl}/sources/${source.id}`, source);
  }

}
