import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (private afAuth: AngularFireAuth) {}

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
   *
   * @todo 如果在初始化时使用会一直返回 false，无法确定这种用法是否正确
   */
  public get isLoggedIn (): boolean {
    let loggedIn = false;
    this.afAuth.authState.pipe(
      first()
    ).subscribe(user => loggedIn = !user);
    return loggedIn;
  }
}
