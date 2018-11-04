import { User } from '../../model';

import { AuthActionsUnion, AuthActionTypes } from '../actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null
};

export function reducer (
  state = initialState,
  action: AuthActionsUnion
) {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return {
        user: { ...action.payload }
      };
    case AuthActionTypes.Logout:
      return {
        user: null
      };
    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
