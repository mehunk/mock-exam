import { Action } from '@ngrx/store';

import { Category } from '../../model';

export enum CategoryActionTypes {
  LoadCategories = '[Category] Load Categories',
  LoadCategoriesSuccess = '[Category] Load Categories Success'
}

export class LoadCategories implements Action {
  readonly type = CategoryActionTypes.LoadCategories;
}

export class LoadCategoriesSuccess implements Action {
  readonly type = CategoryActionTypes.LoadCategoriesSuccess;

  constructor (public payload: Category[]) {}
}

export type CategoryActionsUnion =
  | LoadCategories
  | LoadCategoriesSuccess;
