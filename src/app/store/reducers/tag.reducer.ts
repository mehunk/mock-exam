import {
  TagActionTypes,
  TagActionsUnion
} from '../actions/tag.actions';

export interface State {
  tags: string[];
}

export const initialState: State = {
  tags: []
};

export function reducer (
  state = initialState,
  action: TagActionsUnion
) {
  switch (action.type) {
    case TagActionTypes.LoadTags:
      return {
        ...state,
        tags: []
      };
    case TagActionTypes.LoadTagsSuccess:
      return {
        ...state,
        tags: action.payload
      };
    default:
      return state;
  }
}

export const getTags = (state: State) => state.tags;
