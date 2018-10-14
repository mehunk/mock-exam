import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';

import * as fromCatetory from './category.reducer';
import * as fromTag from './tag.reducer';
import * as fromQuestion from './question.reducer';
import * as fromCategoryDictionary from './category-dictionary.reducer';

// 根状态，包含多个子状态
export interface State {
  category: fromCatetory.State;
  tag: fromTag.State;
  question: fromQuestion.State;
  categoryDictionary: fromCategoryDictionary.State;
}

// 包含多个子 reducer
export const reducers: ActionReducerMap<State> = {
  category: fromCatetory.reducer,
  tag: fromTag.reducer,
  question: fromQuestion.reducer,
  categoryDictionary: fromCategoryDictionary.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

// 创建从根状态选择出 category 状态的选择器
export const selectCategoryState = createFeatureSelector<State, fromCatetory.State>('category');
// 创建从 category 状态中选择出 cagegories 属性的选择器
export const getCategories = createSelector(
  selectCategoryState,
  fromCatetory.getCategories
);

export const getCategoryLoading = createSelector(
  selectCategoryState,
  fromCatetory.getLoading
);

export const getCategoryLoaded = createSelector(
  selectCategoryState,
  fromCatetory.getLoaded
);

// 创建从根状态选择出 categoryDictionary 状态的选择器
export const getCategoryDictionaryState = createFeatureSelector<State, fromCategoryDictionary.State>('categoryDictionary');

export const {
  selectEntities: getCategoryEntities
} = fromCategoryDictionary.adapter.getSelectors(getCategoryDictionaryState);

// 创建从根状态选择出 tag 状态的选择器
export const selectTagState = createFeatureSelector<State, fromTag.State>('tag');
// 创建从 tag 状态中选择出 tags 属性的选择器
export const getTags = createSelector(
  selectTagState,
  fromTag.getTags
);

// 创建从根状态选择出 question 状态的选择器
export const selectQuestionState = createFeatureSelector<State, fromQuestion.State>('question');

export const getQuestions = createSelector(
  selectQuestionState,
  fromQuestion.getQuestions
);
export const getQuestionLoading = createSelector(
  selectQuestionState,
  fromQuestion.getLoading
);
export const getQuestionLoaded = createSelector(
  selectQuestionState,
  fromQuestion.getLoaded
);
export const getQuestionSaving = createSelector(
  selectQuestionState,
  fromQuestion.getSaving
);
export const getQuestionSaved = createSelector(
  selectQuestionState,
  fromQuestion.getSaved
);

export const getQuestionsWithCategory = createSelector(
  getQuestions,
  getCategoryEntities,
  (questions, categories) => {
    console.log(questions);
    return questions.map(question => ({ // 不能直接修改 question，需要新建一个对象
      ...question,
      categories: question.categoryIds.map(id => categories[id])
    }));
  }
);
