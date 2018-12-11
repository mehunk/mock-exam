import {User} from '../../model';

import {AuthActionsUnion, AuthActionTypes} from '../actions';

export interface State {
  loggedInRedirectUrl: string | null;
  user: User | null;
}

export const initialState: State = {
  loggedInRedirectUrl: null,
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
      return {
        ...state,
        loggedInRedirectUrl: action.payload
      };
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload
      };
    case AuthActionTypes.Logout:
      return initialState;
    case AuthActionTypes.AddUserWithRoles:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
