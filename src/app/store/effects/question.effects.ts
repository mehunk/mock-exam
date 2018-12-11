import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Question } from '../../model';
import {
  LoadQuestions,
  LoadQuestionsSuccess,
  LoadUnpublishedQuestions,
  LoadUnpublishedQuestionsSuccess,
  LoadUserQuestions,
  LoadUserQuestionsSuccess,
  AddQuestion,
  AddQuestionSuccess,
  QuestionActionTypes, ApproveQuestion
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
  public loadQuestions$: Observable<Action> = this.actions$.pipe(
    ofType<LoadQuestions>(QuestionActionTypes.LoadQuestions),
    switchMap(() =>
      this.questionService.getQuestions().pipe(
        map(questions => new LoadQuestionsSuccess(questions))
      )
    )
  );

  @Effect()
  public saveQuestion$: Observable<Action> = this.actions$.pipe(
    ofType<AddQuestion>(QuestionActionTypes.AddQuestion),
    switchMap(({ payload: question }) =>
      this.questionService.saveQuestion(question).pipe(
        map(() => new AddQuestionSuccess()),
        tap(() => {
          this.snackBar.open('Question saved!', '', { duration: 2000 });
          this.router.navigate(['/questions']);
        })
      )
    )
  );

  @Effect()
  public loadUnpublishedQuestions$: Observable<Action> = this.actions$.pipe(
    ofType<LoadUnpublishedQuestions>(QuestionActionTypes.LoadUnpublishedQuestions),
    switchMap(() =>
      this.questionService.getUnpublishedQuestions().pipe(
        map(questions => new LoadUnpublishedQuestionsSuccess(questions))
      )
    )
  );

  @Effect()
  public loadUserQuestions$: Observable<Action> = this.actions$.pipe(
    ofType<LoadUserQuestions>(QuestionActionTypes.LoadUserQuestions),
    switchMap(({ payload: user }) =>
      this.questionService.getUserQuestions(user).pipe(
        map(questions => new LoadUserQuestionsSuccess(questions))
      )
    )
  );

  @Effect({ dispatch: false })
  public approveQuestion$: Observable<void> = this.actions$.pipe(
    ofType<ApproveQuestion>(QuestionActionTypes.ApproveQuestion),
    map(({ payload: question }) =>
      this.questionService.approveQuestion(question)
    )
  );
}
