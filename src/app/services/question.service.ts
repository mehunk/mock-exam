import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, from } from 'rxjs';

import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor (
    private db: AngularFireDatabase
  ) { }

  public getQuestions (): Observable<Question[]> {
    return this.db.list<Question>('questions').valueChanges();
  }

  public saveQuestion (question: Question): Observable<any> {
    return from(this.db.list<Question>('questions').push(question));
  }
}
