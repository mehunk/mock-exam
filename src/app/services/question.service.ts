import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private _serviceUrl = 'api/questions';

  constructor (
    private http: HttpClient
  ) { }

  public getQuestions (): Observable<Question[]> {
    return this.http.get<Question[]>(this._serviceUrl);
  }

  public saveQuestion (question: Question): Observable<Question> {
    return this.http.post<Question>(this._serviceUrl, question);
  }
}
