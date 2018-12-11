import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Category } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor (
    private db: AngularFireDatabase
  ) { }

  public getCategories (): Observable<Category[]> {
    return this.db.list<Category>('categories').valueChanges();
  }
}
