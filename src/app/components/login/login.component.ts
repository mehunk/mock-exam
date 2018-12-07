import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor (
    private afAuth: AngularFireAuth,
    private matDialogRef: MatDialogRef<LoginComponent>
  ) {
    // 订阅登录状态
    // this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
  }

  ngOnInit() {
  }

  /**
   * firebase 登录状态监听者
   *
   * @param response - 不知道是什么
   */
  private firebaseAuthChangeListener (response) {
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
  public onSuccess () {
    // this.matDialogRef.close();
  }
}
