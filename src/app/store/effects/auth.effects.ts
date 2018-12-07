import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, map, tap, filter, first } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../../model';
import { Initialize, InitializeUser, Login, LoginSuccess, Logout, AuthActionTypes } from '../actions';
import { LoginComponent } from '../../components';
import { AuthenticationService } from '../../services';

@Injectable()
export class AuthEffects {
  private matDialogRef: MatDialogRef<LoginComponent>;

  /**
   * 实例化时的初始化操作的副作用
   */
  @Effect()
  public initialize$: Observable<Action> = this.actions$.pipe(
    ofType<Initialize>(AuthActionTypes.Initialize),
    switchMap(() =>
      this.authService.getUser().pipe(
        map(firebaseUser => {
          const user = firebaseUser
            ? new User(firebaseUser)
            : null;
          return new InitializeUser(user);
        }),
        first() // 只取一个值，否则还会监听后面正常登录操作的 Observable
      )
    )
  );

  /**
   * 登录操作的副作用
   */
  @Effect()
  public login$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    filter(() => !this.authService.isLoggedIn),
    tap(() => {
        this.matDialogRef = this.matDialog.open(LoginComponent, {
          disableClose: false
        });
      }
    ),
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
  @Effect({ dispatch: false })
  public loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => this.matDialogRef.close())
  );

  /**
   * 注销操作的副作用
   */
  @Effect({ dispatch: false })
  public logout$: Observable<Action> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.authService.logout())
  );

  constructor (
    private actions$: Actions,
    private matDialog: MatDialog,
    private afAuth: AngularFireAuth,
    private authService: AuthenticationService
  ) {}
}
