import { Action } from '@ngrx/store';

import { Question } from '../../model';

export enum QuestionActionTypes {
  LoadQuestions = '[Question] Load Questions',
  LoadQuestionsSuccess = '[Question] Load Questions Success',
  AddQuestion = '[Question] Add Question',
  AddQuestionSuccess = '[Question] Add Question Success'
}

export class LoadQuestions implements Action {
  readonly type = QuestionActionTypes.LoadQuestions;
}

export class LoadQuestionsSuccess implements Action {
  readonly type = QuestionActionTypes.LoadQuestionsSuccess;

  constructor (public payload: Question[]) {}
}

export class AddQuestion implements Action {
  readonly type = QuestionActionTypes.AddQuestion;

  constructor (public payload: Question) {}
}

export class AddQuestionSuccess implements Action {
  readonly type = QuestionActionTypes.AddQuestionSuccess;

  constructor () {}
}

export type QuestionActionsUnion =
  | LoadQuestions
  | LoadQuestionsSuccess
  | AddQuestion
  | AddQuestionSuccess;
