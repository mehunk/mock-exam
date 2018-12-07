import {User} from '../../model';

import {AuthActionsUnion, AuthActionTypes} from '../actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export function reducer (
  state = initialState,
  action: AuthActionsUnion
) {
  switch (action.type) {
    case AuthActionTypes.Initialize:
      return state;
    case AuthActionTypes.InitializeUser:
      return {
        ...state,
        user: action.payload
      };
    case AuthActionTypes.Login:
      return state;
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload
      };
    case AuthActionTypes.Logout:
      return initialState;
    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
