import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as Actions from '../../store/actions';

import { AuthenticationService } from '../../services';
import { User } from '../../model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Mock exam!';
  public user: User;

  constructor (
    private store: Store<fromRoot.State>,
    private authService: AuthenticationService,
  ) {
    // 获取登录用户信息
    this.store
      .pipe(select(fromRoot.getUser))
      .subscribe(user => this.user = user);
  }

  ngOnInit () {
    this.store.dispatch(new Actions.LoadCategories()); // 载入目录
    this.store.dispatch(new Actions.LoadTags()); // 载入标签
    this.store.dispatch(new Actions.LoadQuestions()); // 载入问题
  }

  public login () {
    this.authService.ensureLogin();
  }

  /**
   * 注销
   */
  public logout () {
    this.authService.logout();
  }
}
