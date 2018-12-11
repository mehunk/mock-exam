import { Action } from '@ngrx/store';

import { User } from '../../model';

export enum AuthActionTypes {
  Initialize = '[Auth] Initialize',
  InitializeUser = '[Auth] Initialize User',
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  Logout = '[Auth] Logout',
  AddUserWithRoles = '[Auth] Add User With Roles'
}

/**
 * 实例化时的初始化操作
 */
export class Initialize implements Action {
  readonly type = AuthActionTypes.Initialize;
}

/**
 * 实例化时的初始化用户信息的操作
 */
export class InitializeUser implements Action {
  readonly type = AuthActionTypes.InitializeUser;

  constructor (public payload: User) {}
}

/**
 * 登录操作
 */
export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor (public payload?: string) {}
}

/**
 * 登录成功操作
 */
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor (public payload: User) {}
}

/**
 * 注销操作
 */
export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class AddUserWithRoles implements Action {
  readonly type = AuthActionTypes.AddUserWithRoles;

  constructor (public payload: User) {}
}

export type AuthActionsUnion = Initialize
  | InitializeUser
  | Login
  | LoginSuccess
  | Logout
  | AddUserWithRoles;
