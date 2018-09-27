import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private _serviceUrl = 'api/tags';

  constructor (private http: HttpClient) { }

  public getTags (): Observable<string[]> {
    return this.http.get<string[]>(this._serviceUrl);
  }
}
