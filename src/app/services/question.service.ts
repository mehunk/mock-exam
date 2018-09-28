import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from '../model/question';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private _serviceUrl = 'api/questions';

  constructor (
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  public getQuestions (): Observable<Question[]> {
    return forkJoin(
      this.http.get<Question[]>(this._serviceUrl),
      this.categoryService.getCategories()
    ).pipe(
      map(([questions, categories]) => {
        questions.forEach(q => {
          q.categories = [];
          q.categoryIds.forEach(id => q.categories.push(categories.find(element => element.id === id)));
        });
        return questions;
      })
    );
  }

  public saveQuestion (question: Question): Observable<Question> {
    return this.http.post<Question>(this._serviceUrl, question);
  }
}
