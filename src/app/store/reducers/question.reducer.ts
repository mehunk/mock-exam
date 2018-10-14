import { Question } from '../../model';

import { QuestionActionTypes, QuestionActionsUnion } from '../actions';

export interface State {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  questions: Question[];
}

const initialState: State = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  questions: []
};

export function reducer (
  state = initialState,
  action: QuestionActionsUnion
): State {
  switch (action.type) {
    case QuestionActionTypes.LoadQuestions:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case QuestionActionTypes.LoadQuestionsSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        questions: action.payload
      };
    case QuestionActionTypes.AddQuestion:
      return {
        ...state,
        saving: true,
        saved: false
      };
    case QuestionActionTypes.AddQuestionSuccess:
      return {
        ...state,
        saving: false,
        saved: true
      };
    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getSaving = (state: State) => state.saving;
export const getSaved = (state: State) => state.saved;
export const getQuestions = (state: State) => state.questions;
