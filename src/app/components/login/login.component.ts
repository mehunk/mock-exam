import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { LoginSuccess } from '../../store/actions';
import { User } from '../../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor (
    private store: Store<fromRoot.State>,
    private sfAuth: AngularFireAuth
  ) {
    // 订阅登录状态
    this.sfAuth.authState.subscribe(this.firebaseAuthChangeListener);
  }

  ngOnInit() {
  }

  /**
   * firebase 登录状态监听者
   *
   * @param response - 不知道是什么
   */
  private firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    console.log(response);
    if (response) {
      console.log('Logged in :)');
    } else {
      console.log('Logged out :(');
    }
  }

  /**
   * 登录成功回调函数
   *
   * @param signInSuccessData - 登录成功数据
   */
  public onSuccess (signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData);
    const user: User = new User(signInSuccessData.authResult.user);
    console.log(user);
    this.store.dispatch(new LoginSuccess(user));
  }

  /**
   * 登录失败回调函数
   *
   * @param errorData - 登录失败数据
   */
  public onError(errorData: FirebaseUISignInFailure) {
    console.log(errorData);
  }
}
