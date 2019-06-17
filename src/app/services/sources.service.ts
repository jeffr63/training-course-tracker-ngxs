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

  addSource(source: Source) {
    return this.http.post(`${this.baseUrl}/sources`, source);
  }

  deleteSource(id) {
    return this.http.delete<Source>(`${this.baseUrl}/sources/${id}`);
  }

  getSource(id) {
    return this.http.get<Source>(`${this.baseUrl}/sources/${id}`);
  }

  loadSources() {
    return this.http.get<Source[]>(`${this.baseUrl}/sources?_sort=name&_order=asc`);
  }

  saveSource(source: Source) {
    if (source.id) {
      return this.updateSource(source);
    } else {
      return this.addSource(source);
    }
  }

  updateSource(source: Source) {
    return this.http.put(`${this.baseUrl}/sources/${source.id}`, source);
  }

}
