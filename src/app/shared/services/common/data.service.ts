import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly #http = inject(HttpClient);

  public add<T>(data: T, url: string): Observable<T> {
    if (!data || !url) {
      return of(<T>{});
    }
    return this.#http.post<T>(`${url}`, data);
  }

  public delete<T>(id: number, url: string): Observable<T> {
    if (!id || !url) {
      return of(<T>{});
    }
    return this.#http.delete<T>(`${url}/${id}`);
  }

  public getById<T>(id: number, url: string): Observable<T> {
    if (!id || !url) {
      return of(<T>{});
    }
    return this.#http.get<T>(`${url}/${id}`);
  }

  public getAll<T>(url: string): Observable<T> {
    if (!url) {
      return of(<T>[]);
    }
    return this.#http.get<T>(`${url}`);
  }

  public update<T>(id: number, data: T, url: string): Observable<T> {
    if (!id || !data || !url) {
      return of(<T>{});
    }
    return this.#http.put<T>(`${url}/${id}`, data);
  }

  public patch<T>(id: number, data: any, url: string): Observable<T> {
    if (!id || !data || !url) {
      return of(<T>{});
    }
    return this.#http.patch<T>(`${url}/${id}`, data);
  }
}
