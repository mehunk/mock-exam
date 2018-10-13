import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Category } from '../../model';
import {
  CategoryActionTypes,
  CategoryActionsUnion
} from '../actions/category.actions';

export interface State extends EntityState<Category> {}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: CategoryActionsUnion
) {
  switch (action.type) {

    case CategoryActionTypes.LoadCategoriesSuccess:
      return adapter.addMany(action.payload, state);

    default: // 如果不加这句默认条件的话，当前的状态会被移除掉
      return state;
  }
}
