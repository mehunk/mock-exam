import { Category } from '../../model';

import {
  CategoryActionTypes,
  CategoryActionsUnion
} from '../actions/category.actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  categories: Category[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  categories: []
};

export function reducer (
  state = initialState,
  action: CategoryActionsUnion
): State {
  switch (action.type) {
    case CategoryActionTypes.LoadCategories: {
      return {
        ...state,
        loading: true
      };
    }

    case CategoryActionTypes.LoadCategoriesSuccess: {
      return {
        ...state,
        loaded: true,
        loading: false,
        categories: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getCategories = (state: State) => state.categories;
