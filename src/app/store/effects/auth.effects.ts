import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, exhaustMap, map, tap, filter, first } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { User } from '../../model';
import { Initialize, InitializeUser, Login, LoginSuccess, Logout, AddUserWithRoles, AuthActionTypes } from '../actions';
import { LoginComponent } from '../../components';
import { AuthenticationService } from '../../services';

@Injectable()
export class AuthEffects {
  private loggedInRedirectUrl: string; // 未登录状态下访问被路由守卫拦截的目标地址
  private matDialogRef: MatDialogRef<LoginComponent>;

  /**
   * 实例化时的初始化操作的副作用
   */
  @Effect()
  public initialize$: Observable<Action> = this.actions$.pipe(
    ofType<Initialize>(AuthActionTypes.Initialize),
    switchMap(() =>
      this.authService.getUser().pipe(
        first(), // 只取一个值，否则还会监听后面正常登录操作的 Observable
        filter(user => !!user),
        map(user => new InitializeUser(new User(user)))
      )
    )
  );

  @Effect()
  public initializeUser$: Observable<Action> = this.actions$.pipe(
    ofType<InitializeUser>(AuthActionTypes.InitializeUser),
    switchMap(({ payload: user }) =>
      this.authService.getUserRoles(user).pipe(
        map(userWithRoles => new AddUserWithRoles(userWithRoles))
      )
    )
  );

  /**
   * 登录操作的副作用
   */
  @Effect()
  public login$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    exhaustMap(login => this.authService.isLoggedIn.pipe(
      filter(isLoggedIn => !isLoggedIn),
      tap(() => (this.loggedInRedirectUrl = login.payload))
    )),
    tap(() => {
      this.matDialogRef = this.matDialog.open(LoginComponent, {
        disableClose: false
      });
    }),
    switchMap(() =>
      this.authService.getUser().pipe(
        filter(user => !!user), // 存在 user 为 null 的情况
        map(user =>
          new LoginSuccess(new User(user))
        )
      )
    )
  );

  /**
   * 登录成功操作的副作用
   */
  @Effect()
  public loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => {
      this.matDialogRef.close();
      this.matDialogRef = null;
      if (this.loggedInRedirectUrl) {
        this.router.navigateByUrl(this.loggedInRedirectUrl);
        this.loggedInRedirectUrl = null;
      }
    }),
    switchMap(({ payload: user }) => this.authService.getUserRoles(user).pipe(
      map(userWithRoles => new AddUserWithRoles(userWithRoles))
    ))
  );

  /**
   * 注销操作的副作用
   */
  @Effect({ dispatch: false })
  public logout$: Observable<Action> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      this.authService.logout();
      this.router.navigateByUrl('/');
    })
  );

  constructor (
    private router: Router,
    private actions$: Actions,
    private matDialog: MatDialog,
    private authService: AuthenticationService
  ) {}
}
