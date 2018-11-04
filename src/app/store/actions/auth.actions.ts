import { Action } from '@ngrx/store';

import { User } from '../../model';

export enum AuthActionTypes {
  LoginSuccess = '[Auth] Login Success',
  Logout = '[Auth] Logout'
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor (public payload: User) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | LoginSuccess
  | Logout;
