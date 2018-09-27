import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _serviceUrl = 'api/categories';  // URL to web api

  constructor (
    private http: HttpClient
  ) { }

  public getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(this._serviceUrl);
  }
}
