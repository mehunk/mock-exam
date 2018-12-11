import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor (
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  /**
   * 注销
   */
  public logout (): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  /**
   * 获取登录用户
   */
  public getUser (): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  /**
   * 获取登录状态
   */
  public get isLoggedIn (): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user),
      first()
    );
  }

  /**
   * 获取当前用户的角色列表
   *
   * @param user - 用户信息
   */
  public getUserRoles (user: User): Observable<User> {
    return this.db.object<any>(`users/${user.userId}/roles`)
      .valueChanges()
      .pipe(
        first(),
        map(roles => {
          user.roles = roles;
          return user;
        })
      );
  }
}
