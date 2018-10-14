import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private _serviceUrl = 'api/tags';

  constructor (private db: AngularFireDatabase) { }

  public getTags (): Observable<string[]> {
    return this.db.list<string>('tags').valueChanges();
  }
}
