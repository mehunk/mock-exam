import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Question } from '../../model';
import {
  LoadQuestions,
  LoadQuestionsSuccess,
  AddQuestion,
  AddQuestionSuccess,
  QuestionActionTypes
} from '../actions';
import { QuestionService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable()
export class QuestionEffects {
  constructor (
    private router: Router,
    private actions$: Actions,
    private questionService: QuestionService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  public loadQuestions: Observable<Action> = this.actions$.pipe(
    ofType<LoadQuestions>(QuestionActionTypes.LoadQuestions),
    switchMap(() =>
      this.questionService.getQuestions().pipe(
        map((questions: Question[]) => new LoadQuestionsSuccess(questions))
      )
    )
  );

  @Effect()
  public saveQuestion: Observable<Action> = this.actions$.pipe(
    ofType<AddQuestion>(QuestionActionTypes.AddQuestion),
    switchMap(action =>
      this.questionService.saveQuestion(action.payload).pipe(
        map(() => new AddQuestionSuccess()),
        tap(() => {
          this.snackBar.open('Question saved!', '', { duration: 2000 });
          this.router.navigate(['/questions']);
        })
      )
    )
  );
}
