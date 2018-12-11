import {Question} from '../../model';

import {QuestionActionsUnion, QuestionActionTypes} from '../actions';

export interface State {
  questions: Question[];
  unpublishedQuestions: Question[];
  userQuestions: Question[];
}

const initialState: State = {
  questions: [],
  unpublishedQuestions: [],
  userQuestions: [],
};

export function reducer (
  state = initialState,
  action: QuestionActionsUnion
): State {
  switch (action.type) {
    case QuestionActionTypes.LoadQuestions:
    case QuestionActionTypes.LoadUnpublishedQuestions:
    case QuestionActionTypes.LoadUserQuestions:
    case QuestionActionTypes.AddQuestion:
    case QuestionActionTypes.AddQuestionSuccess:
      return state;
    case QuestionActionTypes.LoadQuestionsSuccess:
      return {
        ...state,
        questions: action.payload
      };
    case QuestionActionTypes.LoadUnpublishedQuestionsSuccess:
      return {
        ...state,
        unpublishedQuestions: action.payload
      };
    case QuestionActionTypes.LoadUserQuestionsSuccess:
      return {
        ...state,
        userQuestions: action.payload
      };
    default:
      return state;
  }
}

export const getQuestions = (state: State) => state.questions;
export const getUnpublishedQuestions = (state: State) => state.unpublishedQuestions;
export const getUserQuestions = (state: State) => state.userQuestions;
