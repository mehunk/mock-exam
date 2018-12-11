import { Action } from '@ngrx/store';

import { Question, User } from '../../model';

export enum QuestionActionTypes {
  LoadQuestions = '[Question] Load Questions',
  LoadQuestionsSuccess = '[Question] Load Questions Success',
  LoadUnpublishedQuestions = '[Question] Load Unpublished Questions',
  LoadUnpublishedQuestionsSuccess = '[Question] Load Unpublished Questions Success',
  LoadUserQuestions = '[Question] Load User Questions',
  LoadUserQuestionsSuccess = '[Question] Load User Question Success',
  AddQuestion = '[Question] Add Question',
  AddQuestionSuccess = '[Question] Add Question Success',
  ApproveQuestion = '[Question] Approve Question'
}

export class LoadQuestions implements Action {
  readonly type = QuestionActionTypes.LoadQuestions;
}

export class LoadQuestionsSuccess implements Action {
  readonly type = QuestionActionTypes.LoadQuestionsSuccess;

  constructor (public payload: Question[]) {}
}

export class LoadUnpublishedQuestions implements Action {
  readonly type = QuestionActionTypes.LoadUnpublishedQuestions;
}

export class LoadUnpublishedQuestionsSuccess implements Action {
  readonly type = QuestionActionTypes.LoadUnpublishedQuestionsSuccess;

  constructor (public payload: Question[]) {}
}

export class LoadUserQuestions implements Action {
  readonly type = QuestionActionTypes.LoadUserQuestions;

  constructor (public payload: User) {}
}

export class LoadUserQuestionsSuccess implements Action {
  readonly type = QuestionActionTypes.LoadUserQuestionsSuccess;

  constructor (public payload: Question[]) {}
}

export class AddQuestion implements Action {
  readonly type = QuestionActionTypes.AddQuestion;

  constructor (public payload: Question) {}
}

export class AddQuestionSuccess implements Action {
  readonly type = QuestionActionTypes.AddQuestionSuccess;
}

export class ApproveQuestion implements Action {
  readonly type = QuestionActionTypes.ApproveQuestion;

  constructor (public payload: Question) {}
}

export type QuestionActionsUnion =
  | LoadQuestions
  | LoadQuestionsSuccess
  | LoadUnpublishedQuestions
  | LoadUnpublishedQuestionsSuccess
  | LoadUserQuestions
  | LoadUserQuestionsSuccess
  | AddQuestion
  | AddQuestionSuccess
  | ApproveQuestion;
