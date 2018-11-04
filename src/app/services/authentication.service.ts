import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { LoginSuccess, Logout } from '../store/actions';
import { User } from '../model';
import * as fromRoot from '../store/reducers';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (
    private afAuth: AngularFireAuth,
    private matDialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // 用户登录
        console.log(user);
        console.log(user.providerData[0].displayName + ':' + user.providerData[0].email);
        this.store.dispatch(new LoginSuccess(new User(user)));
      } else {
        // 用户注销
        this.store.dispatch(new Logout());
      }
    });
  }

  /**
   * 确保登录
   */
  public ensureLogin () {
    if (!this.isAuthenticated) {
      this.showLogin();
    }
  }


  /**
   * 弹出登录框
   */
  public showLogin () {
    this.matDialog.open(LoginComponent, {
      disableClose: false
    });
  }

  /**
   * 注销
   */
  public logout () {
    this.afAuth.auth.signOut();
  }

  get isAuthenticated (): boolean {
    return !!this.user;
  }

  get user (): User {
    let user: User;
    this.store.pipe(
      select(fromRoot.getUser),
      take(1)
    ).subscribe(fireUser => user = fireUser);
    return user;
  }
}
